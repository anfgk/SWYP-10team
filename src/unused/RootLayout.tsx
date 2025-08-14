import { Outlet } from "react-router-dom";
import MainHeader from "../components/layout/MainHeader";
import MainFooter from "../components/layout/MainFooter";

const RootLayout = () => {
  return (
    <div className="App">
      <MainHeader />
      <Outlet />
      <MainFooter />
    </div>
  );
};

export default RootLayout;
