import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./components/layouts/RootLayout";
import MypageLayout from "./components/layouts/MypageLayout";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import MyInfo from "./pages/MyInfo";
import MyReview from "./pages/MyReview";
import Wish from "./pages/Wish";
import ReviewWrite from "./pages/ReviewWrite";
import useUserLocation from "./hooks/useUserLocation";
import ScrollToTop from "./hooks/ScrollToTop";

function App() {
  useUserLocation();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="reviewwrite" element={<ReviewWrite />} />

          {/* 마이페이지 레이아웃 */}
          <Route path="/" element={<MypageLayout />}>
            <Route path="myinfo" element={<MyInfo />} />
            <Route path="myreview" element={<MyReview />} />
            <Route path="wish" element={<Wish />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
