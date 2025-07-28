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

  const handleIndicatorClick = (i: number) => setIndex(i);

  return (
    <section className="flex flex-col gap-[24px] w-full h-[483px] py-[36px]">
      <p className="text-[32px] font-dunggeunmiso font-bold text-[var(--main-color)]">
        AI 추천
      </p>
      <div className="h-[304px] w-[1200px] mx-auto relative rounded-[14px] overflow-hidden">
        {/* 카드 슬라이드 */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${index * 1200}px)`,
            width: `${100 * max}%`,
          }}
        >
          {testAiRec.map((rec) => (
            <div key={rec} className="w-[1200px] flex-shrink-0">
              <AiRecCard desc={"요즘 같은 날엔 루프탑 파티 " + rec} />
            </div>
          ))}
        </div>
      </div>
      {/* 인디케이터 */}
      <div className="flex gap-[8px] w-fit h-[8px] mx-auto">
        {testAiRec.map((_, i) => (
          <button
            key={i}
            className={`h-full rounded-[16px] transition-width duration-500 ${i === index ? "w-[40px] bg-[var(--main-color)]" : "w-[8px] bg-[var(--indicator-disabled)]"} cursor-pointer`}
            onClick={() => handleIndicatorClick(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default AiRecList;
