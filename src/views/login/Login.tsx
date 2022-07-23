import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { showAlert } from "../../store/alert.slice";
import { setCredentials } from "../../store/auth.slice";
// @ts-ignore
import Input from "@/components/core/Input";
import Button from "../../components/core/Button";
import Vertical from "../../components/core/Vertical";
import { AlertType } from "../../Enums";
import { H2 } from "../../components/core/Titles";
import AuthorizationWrapper from "../../components/core/AuthorizationWrapper";
import {
  useCreateUserSession,
  useGetRequestToken,
  useValidateRequestToken,
} from "../../hooks/api/Auth";

interface LoginInputs {
  login: string;
  password: string;
}

const schema = yup.object({
  login: yup.string().required().min(4),
  password: yup.string().required().min(5),
});

export default function Login() {
  // const sessionIdSelector = useAppSelector((state) => state.auth.sessionId);

  const { data: requestToken } = useGetRequestToken();
  const validateRequestToken = useValidateRequestToken();
  const createUserSession = useCreateUserSession();
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

  async function handleLogin(data: LoginInputs) {
    if (requestToken) {
      try {
        const validToken = await validateRequestToken.mutateAsync({
          username: data.login,
          password: data.password,
          requestToken: requestToken.request_token,
        });

        const session = await createUserSession.mutateAsync(
          validToken.request_token
        );

        dispatch(
          setCredentials({
            sessionId: session.session_id,
            requestToken: requestToken.request_token,
            requestTokenExpiresAt: requestToken.expires_at,
          })
        );
        sessionStorage.setItem(
          "auth",
          JSON.stringify({
            sessionId: session.session_id,
            requestToken: requestToken.request_token,
            requestTokenExpiresAt: requestToken.expires_at,
          })
        );
        navigate("/home");
      } catch (e) {
        console.log(e);
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
