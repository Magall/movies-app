import MyRouter from "./router";
import Alert from "./components/core/Alert";
import "./App.scss";
import Nav from "./components/ui/Nav";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "./store/auth.slice";
import { useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

function App() {
  const requestToken = useAppSelector((state) => state.auth.requestToken);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = new QueryClient();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (requestToken === "EXPIRED" && location.pathname !== "/") {
      navigate("/", { replace: true });
    }

    if (requestToken === "INVALID") {
      let authData = sessionStorage.getItem("auth");
      if (authData) {
        const parsed = JSON.parse(authData);
        dispatch(setCredentials(parsed));
      }
    }
  },[requestToken]);
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Nav />
        <Alert />
        <MyRouter />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
