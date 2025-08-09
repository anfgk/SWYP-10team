import { useEffect } from "react";

const useEnterKey = (onPress: () => void) => {
  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") onPress();
    };
    document.addEventListener("keydown", handleEnter);
    return () => document.removeEventListener("keydown", handleEnter);
  });
};

export { useEnterKey };
