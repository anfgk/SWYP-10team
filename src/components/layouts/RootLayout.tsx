import { Outlet } from "react-router-dom";
import MainHeader from "../layout/MainHeader";
import MainFooter from "../layout/MainFooter";

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
