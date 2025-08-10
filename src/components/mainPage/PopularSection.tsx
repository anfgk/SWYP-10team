import { Link } from "react-router-dom";
import PopularSlide from "./PopularSlide";
import PopularToolTip from "./PopularTooltip";
import useSlideIndex from "@/hooks/useSlideIndex";
import { usePopularPlaces } from "@/hooks/usePopularPlaces";

const PopularSection = () => {
  const { resultList } = usePopularPlaces();
  const slides = [];

  for (let i = 0; i < resultList.length; i += 4) {
    slides.push(resultList.slice(i, i + 4));
  }

  const { index, handleNext, handlePrev } = useSlideIndex(slides);

  return (
    <section className="relative flex flex-col gap-[24px] w-full h-[527px] py-[36px]">
      {/* 텍스트 div */}
      <div className="flex justify-between items-center w-full h-[51px]">
        <div className="flex gap-[10px] w-fit h-full items-center">
          <p className="text-[32px] font-dunggeunmiso font-bold text-[var(--main-color)]">
            인기
          </p>
          <PopularToolTip />
        </div>

        <Link to={"/popularoftoday"} className="text-[14px] hover:underline">
          더보기
        </Link>
      </div>

      {/* 버튼 포지션 용도로 카드 컨테이너 한번더 감쌈 */}
      <div className="relative w-full h-[380px]">
        {/* 카드 컨테이너 div */}
        <div className="w-full h-[380px] mx-auto overflow-hidden ">
          <div
            className="flex transition-transform duration-700 ease-in-out gap-[20px]"
            style={{
              transform: `translateX(-${index * (1200 + 20)}px)`,
              width: `${1200 * slides.length + 20 * (slides.length - 1)}px`,
            }}
          >
            {slides.map((slide, i) => (
              <PopularSlide key={i} placeList={slide} />
            ))}
          </div>
        </div>

        {/* 이동 버튼 */}
        <button
          className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[40px] h-[40px] cursor-pointer"
          onClick={handlePrev}
        >
          <img
            src="/assets/buttons/button_left.png"
            alt="left"
            className="w-full h-full transition hover:brightness-95 active:brightness-92"
          />
        </button>
        <button
          className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 w-[40px] h-[40px] cursor-pointer "
          onClick={handleNext}
        >
          <img
            src="/assets/buttons/button_right.png"
            alt="right"
            className="w-full h-full transition hover:brightness-95 active:brightness-92"
          />
        </button>
      </div>
    </section>
  );
};

export default PopularSection;
