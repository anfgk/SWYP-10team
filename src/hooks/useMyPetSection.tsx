import { useEffect, useState } from "react";

import type { PetData } from "@/types/apiResponseTypes";
import { fetchWithAuth } from "@/lib/fetchUtils";

const useMyPetSection = () => {
  const [petList, setPetList] = useState<PetData[]>([]);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const res = await fetchWithAuth("/api/pet/profile", { method: "GET" });

        if (!res.ok) {
          if (res.status === 404) {
            alert("사용자를 찾을 수 없습니다.");
          } else {
            alert("반려동물 목록을 불러오지 못했습니다.");
            throw new Error("반려동물 목록 요청 실패");
          }
          return;
        }
        const data = await res.json();
        setPetList(data.data);
        console.log(data);
      } catch (e) {
        console.error("반려동물 목록 로드 실패: ", e);
      }
    };

    fetchPetData();
  }, []);

  return { petList };
};

export { useMyPetSection };
