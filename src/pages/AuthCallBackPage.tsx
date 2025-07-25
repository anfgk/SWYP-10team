import useIssueAccessToken from "@/hooks/useIssueAccessToken";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthCallBackPage = () => {
  useIssueAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectURL = sessionStorage.getItem("loginLocation") || "/";
    navigate(redirectURL);
  }, [navigate]);

  return <div>로그인 중...</div>;
};

export default AuthCallBackPage;
