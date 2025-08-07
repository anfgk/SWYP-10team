import useSlideIndex from "@/hooks/useSlideIndex";
import PhotoSlide from "./PhotoSlide";
import type { ResponseImage } from "@/types/apiResponseTypes";

interface Props {
  photoList: ResponseImage[];
  setIndex: (idx: number) => void;
  activeIndex: number;
}

const PhotoSlideSection = ({ photoList, setIndex, activeIndex }: Props) => {
  const slides: ResponseImage[][] = [];
  for (let i = 0; i < photoList.length; i += 7) {
    slides.push(photoList.slice(i, i + 7));
  }

  const { index, handleNext, handlePrev } = useSlideIndex(slides);

  return (
    <section className="w-full h-[116px] flex">
      {/* 리뷰 사진 모음 */}
      <div className="w-full h-full flex flex-row items-center justify-between">
        <button
          className="w-[24px] h-[24px] cursor-pointer"
          onClick={handlePrev}
        >
          <img
            src="/assets/buttons/button_photo_left.png"
            alt="left"
            className="w-full h-full"
          />
        </button>
        {/* 카드 컨테이너 div */}
        <div className="w-[884px] h-[116px] mx-auto overflow-hidden ">
          <div
            className="flex transition-transform duration-700 ease-in-out gap-[12px]"
            style={{
              transform: `translateX(-${index * (884 + 12)}px)`,
              width: `${884 * slides.length + 12 * (slides.length - 1)}px`,
            }}
          >
            {slides.map((slide, i) => (
              <PhotoSlide
                key={i}
                imgs={slide}
                offset={i * 7}
                onPhotoClick={setIndex}
                activeIndex={activeIndex}
              />
            ))}
          </div>
        </div>

        {/* 이동 버튼 */}
        <button
          className="w-[24px] h-[24px] cursor-pointer"
          onClick={handleNext}
        >
          <img
            src="/assets/buttons/button_photo_right.png"
            alt="left"
            className="w-full h-full"
          />
        </button>
      </div>
    </section>
  );
};

export default PhotoSlideSection;
