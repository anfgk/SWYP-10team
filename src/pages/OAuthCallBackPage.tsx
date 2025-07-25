import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const OAuthCallBackPage = () => {
  const [params] = useSearchParams();
  const code = params.get("code");
  const navigate = useNavigate();
  const setAuth = useAuthStore((set) => set.setAuth);
  const loacation = useLocation();

  const provider = loacation.pathname.split("/").pop();

  const autoLogin = sessionStorage.getItem("autoLogin") === "true";

  useEffect(() => {
    if (!code) return;

    (async () => {
      const res = await fetch(
        `백엔드URL/api/oauth2/authorization/${provider}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ code, autoLogin }),
        },
      );

      const data = await res.json();
      if (res.ok) {
        setAuth(data.accesstoken, data.user);
        navigate("/");
      }
    })();
  }, [code]);

  return <div>로그인 중...</div>;
};

export default OAuthCallBackPage;
