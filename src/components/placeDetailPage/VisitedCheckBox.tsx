import { useState } from "react";
import SVGCheckBox from "../common/SVGCheckBox";
import { useAuthStore } from "@/stores/authStore";
import { loginConfirmAlert } from "@/lib/commonUtils";
import { useNavigate } from "react-router-dom";

interface Props {
  placeId: string;
  isVisited: boolean;
}

const VisitedCheckBox = ({ placeId, isVisited }: Props) => {
  const { user } = useAuthStore();
  const isLoggedIn = !!user;
  const navigate = useNavigate();

  const [checked, setChecked] = useState(isVisited);

  const handleChange = (next: boolean) => {
    // 비로그인 일 경우
    if (!isLoggedIn) {
      loginConfirmAlert(navigate);
      return;
    }

    // 로그인 일 경우
    setChecked(next);
    //api 요청 부분
    const endPoint = `/api/user/XXX/${placeId}`;
    const method = next ? "POST" : "DELETE";
    alert(endPoint + " / " + method);
  };
  return <SVGCheckBox checked={checked} onChange={handleChange} />;
};

export default VisitedCheckBox;
