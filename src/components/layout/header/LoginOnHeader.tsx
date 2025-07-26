//import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";

const LoginOnHeader = () => {
  //const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const loginButtonClicked = () => {
    sessionStorage.setItem("loginLocation", window.location.pathname);
    navigate("/login");
  };

  return (
    <button
      className="flex w-[66px] h-[25px] items-center cursor-pointer"
      onClick={loginButtonClicked}
    >
      로그인
    </button>
    // <div
    //   className="flex w-fit h-[56px] items-center cursor-pointer"
    //   onClick={() =>
    //     setAuth("test token", { name: "댕냥이", email: "test@gmail.com" })
    //   }
    // >
    //   로그인(test)
    // </div>
  );
};

export default LoginOnHeader;
