import AiRecCard from "./AiRecCard";
import { useAiRecSection } from "@/hooks/useAiRecSection";

const AiRecList = () => {
  const {
    loading,
    resultList,
    handleIndicatorClick,
    index,
    toggleLeft,
    toggleRight,
  } = useAiRecSection();

  return (
    <section className="relative flex flex-col gap-[24px] w-full h-[483px] py-[36px]">
      <p className="text-[32px] font-dunggeunmiso font-bold text-[var(--main-color)]">
        AI 추천
      </p>
      <article className="h-[304px] w-[1200px] mx-auto relative rounded-[14px] overflow-hidden">
        {/* 카드 슬라이드 */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${index * 1200}px)`,
            width: `${100 * resultList.length}%`,
          }}
        >
          {resultList.map((place, i) => (
            <div key={i} className="w-[1200px] flex-shrink-0">
              <AiRecCard place={place} />
            </div>
          ))}
        </div>
        {/* 페이지 카운터 */}
        {!loading && resultList.length !== 0 && (
          <div className="absolute top-[243px] left-[1097px] w-[56px] h-[32px] rounded-[60px] flex justify-center items-center gap-[4px] bg-[#8c8c8c] font-semibold text-[var(--main-text)]">
            <p>{index + 1}</p>
            <p>/</p>
            <p>{resultList.length}</p>
          </div>
        )}

        {/* 로딩 오버레이 */}
        {(loading || resultList.length === 0) && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 rounded-[16px]">
            <p className="text-white text-[24px] font-semibold">
              AI 추천 장소를 불러오고 있습니다.
            </p>
          </div>
        )}
      </article>
      {/* 인디케이터 */}
      <div className="flex gap-[8px] w-full h-[8px] mx-auto justify-center items-center">
        <button className="w-[24px] h-[24px] cursor-pointer transition hover:brightness-20 active:brightness-10">
          <img
            src="/assets/buttons/indicator_left.png"
            alt="left"
            className="w-full h-full"
            onClick={toggleLeft}
          />
        </button>
        {resultList.map((_, i) => (
          <button
            key={i}
            className={`h-full rounded-[16px] transition-width duration-500 ${i === index ? "w-[40px] bg-[var(--main-color)]" : "w-[8px] bg-[var(--indicator-disabled)]"} cursor-pointer`}
            onClick={() => handleIndicatorClick(i)}
          />
        ))}
        <button className="w-[24px] h-[24px] cursor-pointer transition hover:brightness-20 active:brightness-10">
          <img
            src="/assets/buttons/indicator_right.png"
            alt="left"
            className="w-full h-full"
            onClick={toggleRight}
          />
        </button>
      </div>
    </section>
  );
};

export default AiRecList;
