import { useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import Text from "./Text";
export default function ProtectedRoute({children}: { children: JSX.Element }) {
    const auth = useAppSelector((state) => state.auth.requestToken);
  
    if (auth === "INVALID") {
      return <Text>Invalid Credentials</Text>;
    } else {
      return <div>{children}</div>;
    }
  }
  