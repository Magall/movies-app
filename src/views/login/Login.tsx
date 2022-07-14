import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { showAlert } from "../../features/alert.slice";
// @ts-ignore
import Input from "@/components/core/Input";
import Button from "../../components/core/Button";
import Vertical from "../../components/core/Vertical";
import { AlertType } from "../../Enums";
import {
  useCreateUserSessionMutation,
  useFetchRequestTokenQuery,
} from "../../features/api";
import { H2 } from "../../components/core/Titles";
interface LoginInputs {
  login: string;
  password: string;
}

const schema = yup.object({
  login: yup.string().required().min(4),
  password: yup.string().required().min(5),
});

export default function Login() {
  const [createUserSession, { data: createInfo }] =
    useCreateUserSessionMutation();
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
  const { data: requestToken } = useFetchRequestTokenQuery();
  async function submitForm(data: LoginInputs) {
    console.log(requestToken);
    // createUserSession({ username: data.login, password: data.password });
    // console.log(createInfo);
    // navigate("/home");

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
      <form onSubmit={handleSubmit(submitForm)}>
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
