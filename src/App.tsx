import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import MainHeader from "./components/layout/MainHeader";
import MainFooter from "./components/layout/MainFooter";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SearchResultPage from "./pages/SearchResultPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import TodaysPopularListPage from "./pages/TodaysPopularListPage";
import AuthCallBackPage from "./pages/AuthCallBackPage";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import ReviewWritePage from "./pages/ReviewWritePage";
import ReviewEditPage from "./pages/ReviewEditPage";
import MyReviewPageFixed from "./pages/MyReviewPageFixed";
import MyInfoPageFixed from "./pages/MyInfoPageFixed";
import MyWishPageFixed from "./pages/MyWishPageFixed";

import useUserLocation from "./hooks/useUserLocation";
import useIssueAccessToken from "./hooks/useIssueAccessToken";

import CustomToast from "./components/common/CustomToast";
import ScrollToTop from "./hooks/ScrollToTop";

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
          <Route path="/popularoftoday" element={<TodaysPopularListPage />} />
          <Route path="/authredirect" element={<AuthCallBackPage />} />

          {/* 인증이 있어야 들어갈 수 있는 경로(protectedRoute) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/myinfo" element={<MyInfoPageFixed />} />
            <Route path="/myreview" element={<MyReviewPageFixed />} />
            <Route path="/mywish" element={<MyWishPageFixed />} />
            <Route path="/reviewwrite/:id" element={<ReviewWritePage />} />
            <Route path="/reviewedit/:id" element={<ReviewEditPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <MainFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
