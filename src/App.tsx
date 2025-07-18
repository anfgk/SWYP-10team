import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainFooter from "./components/layout/MainFooter";
import MainHeader from "./components/layout/MainHeader";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SearchResultPage from "./pages/SearchResultPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import useUserLocation from "./hooks/useUserLocation";
import ScrollToTop from "./hooks/ScrollToTop";

function App() {
  useUserLocation();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="App font-pretendard">
        <MainHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/placedetail/:id" element={<PlaceDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <MainFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
