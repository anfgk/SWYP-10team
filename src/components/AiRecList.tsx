import { useState, useRef, useEffect } from "react";
import AiRecCard from "./AiRecCard";

export default function AiRecList() {
  const testAiRec = [1, 2, 3, 4, 5];

  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const max = testAiRec.length;

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % max);
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, max]);

  const handleDotClick = (i: number) => setIndex(i);

  return (
    <section className="h-[577px] w-[1920px] mx-auto relative overflow-hidden mt-[52px]">
      {/* 카드 슬라이드 */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
          width: `${100 * max}%`,
        }}
      >
        {testAiRec.map((rec) => (
          <div key={rec} className="w-full flex-shrink-0">
            <AiRecCard value={rec} />
          </div>
        ))}
      </div>

      {/* 텍스트 */}
      <p className="absolute text-[48.88px] top-[60.81px] left-[164.98px]">
        AI 추천
      </p>
      {/* 점 인디케이터 */}
      <div className="absolute top-[487.42px] left-1/2 -translate-x-1/2 flex items-center text-md gap-2 z-40">
        {testAiRec.map((_, i) => (
          <button
            key={i}
            className="cursor-pointer mx-1"
            onClick={() => handleDotClick(i)}
          >
            {i === index ? "●" : "○"}
          </button>
        ))}
      </div>
    </section>
  );
}
