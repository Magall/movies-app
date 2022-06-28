import { useAppSelector } from "./app/hooks";
import MyRouter from "./router";
import Alert from "./components/core/Alert";
import "./App.scss";
import Nav from './components/ui/Nav'
function App() {
  return (
    <div className="App">
      <Nav />
      <Alert />
      <MyRouter />
    </div>
  );
}

export default App;
