import { fetchSmart } from "@/lib/fetchUtils";
import { useAuthStore } from "@/stores/authStore";
import type { PlaceDetailData } from "@/types/apiResponseTypes";
import { useEffect, useState } from "react";

const usePlaceDetail = (id: string) => {
  const [placeDetail, setPlaceDetail] = useState<PlaceDetailData>();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    const fetchPlaceDetail = async () => {
      setLoading(true);
      try {
        const res = await fetchSmart(
          `/api/content/placedetail?contentId=${id}`,
          {
            method: "GET",
          },
        );

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

  return { loading, placeDetail };
};

export { usePlaceDetail };
