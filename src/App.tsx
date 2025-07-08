import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainFooter from "./components/MainFooter";
import MainHeader from "./components/MainHeader";
import PopularList from "./components/PopularList";
import ThemeList from "./components/ThemeList";
import AiRecList from "./components/AiRecList";
import SearchPanel from "./components/SearchPannel";
import MyReview from "./screens/MyReview";
import ReviewWrite from "./screens/ReviewWrite";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainHeader />
        <div className="max-w-[1200px] mx-auto px-4">
          <Routes>
            <Route
              path="/"
              element={
                <main className="flex flex-col gap-[72px] py-[72px]">
                  <SearchPanel />
                  <ThemeList />
                  <PopularList />
                  <AiRecList />
                </main>
              }
            />
            <Route path="/MyReview" element={<MyReview />} />
            <Route path="/ReviewWrite" element={<ReviewWrite />} />
          </Routes>
          <MainFooter />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
