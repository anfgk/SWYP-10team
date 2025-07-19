import { Outlet } from "react-router-dom";
import MainHeader from "../MainHeader";
import MainFooter from "../MainFooter";

const RootLayout = () => {
  return (
    <div className="App">
      <MainHeader />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <MainFooter />
    </div>
  );
};

export default RootLayout;
