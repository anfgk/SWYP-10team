import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainHeader from "./components/layout/MainHeader";
import MainFooter from "./components/layout/MainFooter";

import useUserLocation from "./hooks/useUserLocation";
import useIssueAccessToken from "./hooks/useIssueAccessToken";

import CustomToast from "./components/common/CustomToast";
import ScrollToTop from "./hooks/ScrollToTop";
import AppRoutes from "./components/routes/AppRoutes";

function App() {
  useUserLocation();
  useIssueAccessToken();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <CustomToast />
      <div className="App font-pretendard">
        <MainHeader />
        <AppRoutes />
        <MainFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
