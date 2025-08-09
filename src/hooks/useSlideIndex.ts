import { useState } from "react";

const useSlideIndex = (slides: any[]) => {
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };
  return { index, handlePrev, handleNext };
};

export default useSlideIndex;
