import { useState } from "react";
import SVGCheckBox from "../common/SVGCheckBox";
import { useAuthStore } from "@/stores/authStore";
import { loginConfirmAlert } from "@/lib/commonUtils";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "@/lib/fetchUtils";

interface Props {
  placeId: string;
  isVisited: boolean;
}

const VisitedCheckBox = ({ placeId, isVisited }: Props) => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const [checked, setChecked] = useState(
    isLoggedIn ? (isVisited ?? false) : false
  );

  const handleChange = (next: boolean) => {
    // 비로그인 일 경우
    if (!isLoggedIn) {
      loginConfirmAlert(navigate);
      return;
    }

    //로그인 일 경우 api요청
    const fetchVisited = async () => {
      try {
        const res = await fetchWithAuth(
          `/api/content/visited-check?contentId=${placeId}`,
          {
            method: "GET",
          }
        );
        if (res.ok) setChecked(next);
        const data = await res.json();
        console.log(data);
      } catch (e) {
        console.log("장소 방문 체크 실패", e);
      } finally {
        //setChecked(next);
      }
    };

    fetchVisited();
  };
  return <SVGCheckBox checked={checked} onChange={handleChange} />;
};

export default VisitedCheckBox;
