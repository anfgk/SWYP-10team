import { useState, useEffect } from "react";
import { fetchSmart } from "@/lib/fetchUtils";
import { useAuthStore } from "@/stores/authStore";
import type { PopularCardData } from "@/types/apiResponseTypes";

const usePopularPlaces = () => {
  const [loading, setLoading] = useState(false);
  const [resultList, setResultList] = useState<PopularCardData[]>([]);
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    const fetchLoadPopularList = async () => {
      setLoading(true);

      try {
        const res = await fetchSmart("/api/content/rank", {
          method: "GET",
        });

        if (res.status === 204) {
          setResultList([]);
          return;
        }

        if (!res.ok) throw new Error("인기 목록 요청 실패");

        const data = await res.json();
        setResultList(data.data);
      } catch (e) {
        console.error("인기 목록 불러오기 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchLoadPopularList();
  }, [isLoggedIn]);

  return { loading, resultList };
};

export { usePopularPlaces };
