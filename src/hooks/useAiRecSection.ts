import { fetchSmart } from "@/lib/fetchUtils";
import { useAuthStore } from "@/stores/authStore";
import type { AiRecommendData } from "@/types/apiResponseTypes";
import { useEffect, useState, useRef } from "react";

const useAiRecSection = () => {
  const [loading, setLoading] = useState(false);
  const [resultList, setResultList] = useState<AiRecommendData[]>([]);
  const { isLoggedIn } = useAuthStore();
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchAiRecList = async () => {
      setLoading(true);

      try {
        const res = await fetchSmart("/api/content/ai/recommends", {
          method: "GET",
        });

        if (res.status === 500) {
          if (!cancelled) setResultList([]);
          return;
        }

        if (!res.ok) throw new Error("AI 추천 목록 요청 실패");

        const data = await res.json();
        if (!cancelled) {
          setResultList(data.data ?? []);
          setIndex(0);
        }
      } catch (e) {
        if (!cancelled) setResultList([]);
        console.log("AI 추천 목록 불러오기 실패: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchAiRecList();
    return () => {
      cancelled = true;
    };
  }, [isLoggedIn]);

  useEffect(() => {
    // 기존 타이머 정리
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (loading || resultList.length === 0) return;

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % resultList.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [loading, resultList.length, index]);

  const handleIndicatorClick = (i: number) => setIndex(i);
  const toggleLeft = () =>
    setIndex((prev) => (prev - 1 + resultList.length) % resultList.length);
  const toggleRight = () => setIndex((prev) => (prev + 1) % resultList.length);

  return {
    loading,
    resultList,
    handleIndicatorClick,
    index,
    toggleLeft,
    toggleRight,
  };
};

export { useAiRecSection };
