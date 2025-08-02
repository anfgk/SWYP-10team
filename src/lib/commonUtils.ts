import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const copyCurrentUrl = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      toast.message("링크가 복사되었습니다.");
    })
    .catch(() => {
      toast.message("링크 복사에 실패하였습니다.");
    });
};

const loginConfirmAlert = (navigate: ReturnType<typeof useNavigate>) => {
  const goToLogin = window.confirm(
    "로그인이 필요한 기능입니다. 로그인 페이지로 이동하시겠습니까?"
  );
  if (goToLogin) {
    sessionStorage.setItem("loginLocation", window.location.pathname);
    navigate("/login");
  }
  return;
};

export { copyCurrentUrl, loginConfirmAlert };
