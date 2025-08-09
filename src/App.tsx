import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import MainHeader from "./components/layout/MainHeader";
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
import TodaysPopularListPage from "./pages/TodaysPopularListPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProtectedLayout from "./components/auth/ProtectedMyPageLayout";
import { mypagePaths } from "./configs/myPageRoutes";
import ReviewWritePage from "./pages/ReviewWritePage";
import ReviewEditPage from "./pages/ReviewEditPage";

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
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/reviewwrite/:id" element={<ReviewWritePage />} />
          <Route path="/reviewedit/:id" element={<ReviewEditPage />} />

          {/* <Route
            path="/reviewwrite/:id"
            element={
              <ProtectedRoute>
                <ReviewWritePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviewedit/:id"
            element={
              <ProtectedRoute>
                <ReviewWritePage />
              </ProtectedRoute>
            }
          /> */}

          {/* 마이페이지 */}
          <Route element={ProtectedLayout}>
            {mypagePaths.map((path) => (
              <Route key={path} path={path} element={<MyPage />} />
            ))}
          </Route>
        </Routes>
        <MainFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
