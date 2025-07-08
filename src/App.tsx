import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainFooter from "./components/MainFooter";
import MainHeader from "./components/MainHeader";
import MainScreen from "./screens/MainScreen";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainHeader />
        <MainScreen />
        <MainFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
