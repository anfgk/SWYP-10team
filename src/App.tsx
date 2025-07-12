import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainFooter from "./components/MainFooter";
import MainHeader from "./components/MainHeader";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
        <MainFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
