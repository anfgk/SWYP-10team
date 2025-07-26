import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RootLayout from "./components/layouts/RootLayout";
import MypageLayout from "./components/layouts/MypageLayout";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import TestPage from "./pages/TestPage";
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
          <Route path="test" element={<TestPage />} />

          {/* 마이페이지 레이아웃 */}
          <Route path="myinfo" element={<MypageLayout />}>
            <Route index element={<MyPage />} />
          </Route>
          <Route path="myreview" element={<MypageLayout />}>
            <Route index element={<MyPage />} />
          </Route>
          <Route path="wish" element={<MypageLayout />}>
            <Route index element={<MyPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
