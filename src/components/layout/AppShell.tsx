import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import CustomToast from "@/components/common/CustomToast";
import ScrollToTop from "@/hooks/ScrollToTop";
import AppRoutes from "@/components/routes/AppRoutes";
import { useLocation } from "react-router-dom";

const AppShell = () => {
  const location = useLocation();
  const { pathname, search } = location;

  const step = new URLSearchParams(search).get("step");
  const hideFooter =
    pathname.toLowerCase() === "/aiplanner" && step === "result";
  return (
    <>
      <ScrollToTop />
      <CustomToast />
      <div className="App font-pretendard">
        {!hideFooter && <MainHeader />}
        <AppRoutes />
        {!hideFooter && <MainFooter />}
      </div>
    </>
  );
};

export default AppShell;
