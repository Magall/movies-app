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
function App() {
  const requestToken = useAppSelector((state) => state.auth.requestToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const queryClient = new QueryClient();

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
