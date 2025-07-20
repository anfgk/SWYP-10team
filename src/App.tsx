import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainFooter from "./components/layout/MainFooter";
import MainHeader from "./components/layout/MainHeader";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SearchResultPage from "./pages/SearchResultPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";

import MyInfo from "./pages/MyInfo";
import MyReview from "./pages/MyReview";
import Wish from "./pages/Wish";
import ReviewWrite from "./pages/ReviewWrite";

import useUserLocation from "./hooks/useUserLocation";
import ScrollToTop from "./hooks/ScrollToTop";
import useAutoLogin from "./hooks/useAutoLogin";

function App() {
  useUserLocation();
  useAutoLogin();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App font-pretendard">
        <MainHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/placedetail/:id" element={<PlaceDetailPage />} />

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
