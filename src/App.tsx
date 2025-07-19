import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./components/layouts/RootLayout";
import MypageLayout from "./components/layouts/MypageLayout";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
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
          <Route path="reviewwrite" element={<MyPage />} />

          {/* 마이페이지 레이아웃 */}
          <Route path="mypage" element={<MypageLayout />}>
            <Route index element={<MyPage />} />
            <Route path="myinfo" element={<MyPage />} />
            <Route path="myreview" element={<MyPage />} />
            <Route path="wish" element={<MyPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
