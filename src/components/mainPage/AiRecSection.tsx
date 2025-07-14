import { useState, useRef, useEffect } from "react";
import AiRecCard from "./AiRecCard";

const AiRecList = () => {
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
    <section className="flex justify-center w-full h-[418.55px]">
      <div className="w-[1200px] h-[418.55px] flex flex-col justify-between">
        <div>
          <p className="text-[38.23px]">AI 추천</p>
        </div>
        <div className="h-[342.55px] w-[1200px] mx-auto relative overflow-hidden mt-[52px]">
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

          {/* 점 인디케이터 */}
          <div className="absolute top-[250px] left-1/2 -translate-x-1/2 flex items-center text-[28.55px] gap-[26px] z-40">
            {testAiRec.map((_, i) => (
              <button
                key={i}
                className="cursor-pointer"
                onClick={() => handleDotClick(i)}
              >
                {i === index ? "●" : "○"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiRecList;
