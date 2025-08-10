import { fetchSmart, fetchWithAuth } from "@/lib/fetchUtils";
import { useAuthStore } from "@/stores/authStore";
import type { PlaceDetailData } from "@/types/apiResponseTypes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const usePlaceDetail = (id: string) => {
  const [placeDetail, setPlaceDetail] = useState<PlaceDetailData>();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaceDetail = async () => {
      setLoading(true);
      try {
        const res = await fetchSmart(
          `/api/content/placedetail?contentId=${id}`,
          {
            method: "GET",
          }
        );

        if (res.status === 404 || res.status === 400) {
          alert("유효하지 않은 장소입니다.");
          navigate("/");
          return;
        }
        if (!res.ok) throw new Error("장소 정보 불러오기 실패");
        const data = await res.json();
        console.log(data);
        setPlaceDetail(data);
      } catch (e) {
        console.error("장소 api 에러: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaceDetail();
  }, [id, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const fetchRecentPlace = async () => {
      try {
        const res = await fetchWithAuth(`/api/content/recent/${id}`, {
          method: "POST",
        });

        if (!res.ok) throw new Error("최근 본 장소 저장 api 실패");
        const data = await res.json();
        console.log(data);
      } catch (e) {
        console.error("최근 본 장소 저장 실패: ", e);
      }
    };
    fetchRecentPlace();
  }, [id, isLoggedIn]);

  return { loading, placeDetail };
};

export { usePlaceDetail };
