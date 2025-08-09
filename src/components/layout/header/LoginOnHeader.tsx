import { useNavigate } from "react-router-dom";

const LoginOnHeader = () => {
  const navigate = useNavigate();

  const loginButtonClicked = () => {
    sessionStorage.setItem("loginLocation", window.location.pathname);
    navigate("/login");
  };

  return (
    <button
      className="flex w-[66px] h-[25px] items-center cursor-pointer hover:underline underline-offset-4"
      onClick={loginButtonClicked}
    >
      로그인
    </button>
  );
};

export default LoginOnHeader;
