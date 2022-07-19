import { useAppSelector } from "../../app/hooks";

export default function ProtectedRoute({children}: { children: JSX.Element }) {
    const auth = useAppSelector((state) => state.auth.requestToken);
  
    if (auth === "INVALID") {
      return <h1>Invalid Credentials</h1>;
    } else {
      return <div>{children}</div>;
    }
  }
  