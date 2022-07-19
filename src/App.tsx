import MyRouter from "./router";
import Alert from "./components/core/Alert";
import "./App.scss";
import Nav from "./components/ui/Nav";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "./features/auth.slice";
function App() {
  const requestToken = useAppSelector((state) => state.auth.requestToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  if (requestToken === "INVALID") {
    navigate("/", { replace: true });
  } else {
    const authString = sessionStorage.getItem("auth");
    if (authString) {
      const authObj = JSON.parse(authString);
      dispatch(setCredentials(authObj));
    }
  }
  return (
    <div className="App">
      {requestToken !== "INVALID" && <Nav />}
      <Alert />
      <MyRouter />
    </div>
  );
}

export default App;
