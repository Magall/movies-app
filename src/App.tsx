import MyRouter from "./router";
import Alert from "./components/core/Alert";
import "./App.scss";
import Nav from './components/ui/Nav'
import { useAppSelector } from "./app/hooks";
function App() {
  // const test = useAppSelector(state =>state.alert.messages)
  return (
    <div className="App">
      <Nav />
      <Alert />
      <MyRouter />
    </div>
  );
}

export default App;
