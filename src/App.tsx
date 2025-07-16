import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainFooter from "./components/MainFooter";
import MainHeader from "./components/MainHeader";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import MyInfo from "./mypage/MyInfo";
import MyReview from "./mypage/MyReview";
import Wish from "./mypage/Wish";
import ReviewWrite from "./mypage/ReviewWrite";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/myinfo" element={<MyInfo />} />
          <Route path="/myreview" element={<MyReview />} />
          <Route path="/wish" element={<Wish />} />
          <Route path="/reviewwrite" element={<ReviewWrite />} />
        </Routes>
        <MainFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
