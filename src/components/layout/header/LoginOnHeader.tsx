import { useAuthStore } from "@/stores/authStore";
//import { Link } from "react-router-dom";

const LoginOnHeader = () => {
  const { setAuth } = useAuthStore();
  return (
    // <Link
    //   to={"/login"}
    //   className="flex w-[66px] h-[25px] items-center cursor-pointer"
    // >
    //   로그인
    // </Link>
    <div
      className="flex w-fit h-[56px] items-center cursor-pointer"
      onClick={() =>
        setAuth("test token", { name: "댕냥이", email: "test@gmail.com" })
      }
    >
      로그인(test)
    </div>
  );
};

export default LoginOnHeader;
