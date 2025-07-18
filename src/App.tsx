import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainFooter from "./components/MainFooter";
import MainHeader from "./components/MainHeader";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import MyInfo from "./pages/MyInfo";
import MyReview from "./pages/MyReview";
import Wish from "./pages/Wish";
import ReviewWrite from "./pages/ReviewWrite";
import SearchResultPage from "./pages/SearchResultPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import useUserLocation from "./hooks/useUserLocation";
import ScrollToTop from "./hooks/ScrollToTop";

function App() {
  useUserLocation();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App">
        <MainHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/placedetail/:id" element={<PlaceDetailPage />} />
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
