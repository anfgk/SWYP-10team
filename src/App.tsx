import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import MainHeader from "./components/layout/MainHeader";
import MypageLayout from "./components/layouts/MypageLayout";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SearchResultPage from "./pages/SearchResultPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import MyPage from "./pages/MyPage";
import useUserLocation from "./hooks/useUserLocation";
import ScrollToTop from "./hooks/ScrollToTop";
import useIssueAccessToken from "./hooks/useIssueAccessToken";
import AuthCallBackPage from "./pages/AuthCallBackPage";
import MainFooter from "./components/layout/MainFooter";
import CustomToast from "./components/common/CustomToast";

function App() {
  useUserLocation();
  useIssueAccessToken();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <CustomToast />
      <div className="App font-pretendard">
        <MainHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/placedetail/:id" element={<PlaceDetailPage />} />
          <Route path="/authredirect" element={<AuthCallBackPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />

          {/* 마이페이지 레이아웃 */}
          <Route path="/myinfo" element={<MypageLayout />}>
            <Route index element={<MyPage />} />
          </Route>
          <Route path="/myreview" element={<MypageLayout />}>
            <Route index element={<MyPage />} />
          </Route>
          <Route path="/wish" element={<MypageLayout />}>
            <Route index element={<MyPage />} />
          </Route>
          <Route path="/reviewwrite" element={<MypageLayout />}>
            <Route index element={<MyPage />} />
          </Route>
        </Routes>
        <MainFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
