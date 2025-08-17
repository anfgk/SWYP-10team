import type { PetData } from "@/types/apiResponseTypes";
import { useState } from "react";

interface Props {
  petList: PetData[];
}

const useMyPetSlideSection = ({ petList }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const toggleLeft = () => {
    setIndex((prev) => {
      if (prev <= 0) return prev; // 이미 왼쪽 끝이면 그대로
      return prev - 1;
    });
  };

  const toggleRight = () => {
    setIndex((prev) => {
      if (prev >= petList.length) return prev; // AddCard 포함 → 마지막 index는 petList.length
      return prev + 1;
    });
  };

  return { isOpen, setIsOpen, index, toggleLeft, toggleRight };
};

export { useMyPetSlideSection };
