import { Outlet } from "react-router-dom";
import MainHeader from "../MainHeader";
import MainFooter from "../MainFooter";
import ScrollToTop from "../../hooks/ScrollToTop";

const RootLayout = () => {
  return (
    <div className="App">
      <MainHeader />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
};

export default RootLayout;
