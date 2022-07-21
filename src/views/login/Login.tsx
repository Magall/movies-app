import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { useAppSelector } from "../../hooks";
import { showAlert } from "../../store/alert.slice";
import { setCredentials } from "../../store/auth.slice";
// @ts-ignore
import Input from "@/components/core/Input";
import Button from "../../components/core/Button";
import Vertical from "../../components/core/Vertical";
import { AlertType } from "../../Enums";
import {
  useCreateUserSessionMutation,
  useFetchRequestTokenQuery,
  useValidateRequestTokenMutation,
} from "../../store/api";
import { H2 } from "../../components/core/Titles";
import { Http2ServerResponse } from "http2";
import AuthorizationWrapper from "../../components/core/AuthorizationWrapper";
interface LoginInputs {
  login: string;
  password: string;
}

const schema = yup.object({
  login: yup.string().required().min(4),
  password: yup.string().required().min(5),
});

export default function Login() {
  const sessionIdSelector = useAppSelector((state) => state.auth.sessionId);
  const [createUserSession] = useCreateUserSessionMutation();
  const [validateRequestToken] = useValidateRequestTokenMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      login: "",
      password: "",
    },
  });
  const { data: requestToken, refetch: refetchRequestToken } =
    useFetchRequestTokenQuery();

  async function handleLogin(data: LoginInputs) {
    try {
      const validTokenResponse = await validateRequestToken({
        username: data.login,
        password: data.password,
        requestToken: requestToken.request_token,
      }).unwrap();

      const createSessionResponse = await createUserSession(
        validTokenResponse.request_token
      ).unwrap();

      dispatch(
        setCredentials({
          sessionId: createSessionResponse.session_id,
          requestToken: validTokenResponse.request_token,
          requestTokenExpiresAt: requestToken.expires_at,
        })
      );

      const authStringifyed = JSON.stringify({
        sessionId: createSessionResponse.session_id,
        requestToken: validTokenResponse.request_token,
        requestTokenExpiresAt: requestToken.expires_at,
      });
      sessionStorage.setItem("auth", authStringifyed);
      navigate("/home");
    } catch (e: any) {
      console.log(e);
      if (e.data.status_code === 33 && e.status === 401) {
        console.log("sds");
        dispatch(
          setCredentials({
            sessionId: "",
            requestToken: "",
            requestTokenExpiresAt: "",
          })
        );
        refetchRequestToken();
      }
    }
    reset();
  }

  useEffect(() => {
    let resp: (string | undefined)[] = [];
    let property: keyof typeof errors;

    for (property in errors) {
      resp.push(errors[property]?.message);
    }
    dispatch(
      showAlert({
        messages: resp,
        type: AlertType.Problem,
        show: Object.keys(errors).length > 0 ? true : false,
      })
    );
  }, [errors.login, errors.password]);

  return (
      <div id="LoginForm">
        <form onSubmit={handleSubmit(handleLogin)}>
          <Vertical alignItems="center" widthPercent={50} makeOnCenter>
            <H2>Movies World</H2>
            <Input
              type="text"
              placeholder="Fill your email ..."
              {...register("login")}
            />

            <Input
              type="password"
              placeholder="Fill your password"
              {...register("password")}
            />
            <Button type="submit">Login</Button>
          </Vertical>
        </form>
      </div>
  );
}
