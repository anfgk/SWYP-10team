import useIssueAccessToken from "@/hooks/useIssueAccessToken";
import { useNavigate } from "react-router-dom";
const AuthCallBackPage = () => {
  useIssueAccessToken();
  const navigate = useNavigate();
  const redirectURL = sessionStorage.getItem("loginLocation") || "/";

  navigate(redirectURL);
  return <div>로그인 중...</div>;
};

export default AuthCallBackPage;
