import { Outlet } from "react-router-dom";
import MainHeader from "../MainHeader";
import MainFooter from "../MainFooter";

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
