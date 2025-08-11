import { saveLoginLocation } from "@/lib/commonUtils";
import { useNavigate } from "react-router-dom";

const LoginOnHeader = () => {
  const navigate = useNavigate();

  return (
    <button
      className="flex w-[66px] h-[25px] items-center cursor-pointer hover:underline underline-offset-[6px]"
      onClick={() => {
        saveLoginLocation();
        navigate("/login");
      }}
    >
      로그인
    </button>
  );
};

export default LoginOnHeader;
