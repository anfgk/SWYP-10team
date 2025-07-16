import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "PUSH" || navigationType === "REPLACE") {
      // 링크 클릭 또는 replace 이동 시 스크롤 맨 위
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    // POP은 브라우저 뒤/앞 → 스크롤 유지
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;
