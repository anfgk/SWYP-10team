import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainFooter from "./components/MainFooter";
import MainHeader from "./components/MainHeader";
import MainPage from "./pages/MainPage";
import MyInfo from "./mypage/MyInfo";
import Wish from "./mypage/Wish";
import MyReview from "./mypage/MyReview";
import ReviewWrite from "./mypage/ReviewWrite";
import Login from "./pages/Login";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/myinfo" element={<MyInfo />} />
          <Route path="/wish" element={<Wish />} />
          <Route path="/myreview" element={<MyReview />} />
          <Route path="/reviewwrite" element={<ReviewWrite />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SearchResults" element={<SearchResults />} />
        </Routes>
        <MainFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
