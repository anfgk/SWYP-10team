import useSlideIndex from "@/hooks/useSlideIndex";
import ReviewPhotoSlide from "./ReviewPhotoSlide";

import { usePhotoModalState } from "@/hooks/usePhotoModalState";
import PhotoSlideModal from "../../modals/PhotoSlideModal";
import type { ReviewData, ReviewImage } from "@/types/apiResponseTypes";

interface Props {
  reviewData?: ReviewData;
}
const ReviewPhotoSection = ({ reviewData }: Props) => {
  const slides: ReviewImage[][] = [];

  const images: ReviewImage[] = reviewData?.reviewImages ?? [];
  const reviewsCount = reviewData?.totalElements ?? 0;

  for (let i = 0; i < images.length; i += 7) {
    slides.push(images.slice(i, i + 7));
  }

  const { index, handleNext, handlePrev } = useSlideIndex(slides);

  const { isOpen, photoIndex, openModal, closeModal } = usePhotoModalState();

  return (
    <section className="w-full h-fit flex flex-col gap-[24px] border-t-[1px] border-[var(--search-element-border)] pt-[8px]">
      {/* 전체 리뷰 갯수 */}
      <div className="w-fit h-[32px] flex gap-[8px] items-center">
        <h2 className="text-[20px] font-semibold">리뷰</h2>
        <p className="text-[14px]">({reviewsCount}건)</p>
      </div>

      {reviewsCount > 0 && (
        // 리뷰 사진 모음
        <div className="w-full h-[150px] flex flex-row items-center justify-between">
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
          <div className="w-[1128px] h-[150px] mx-auto overflow-hidden ">
            <div
              className="flex transition-transform duration-700 ease-in-out gap-[12px]"
              style={{
                transform: `translateX(-${index * (1128 + 12)}px)`,
                width: `${1128 * slides.length + 12 * (slides.length - 1)}px`,
              }}
            >
              {slides.map((slide, i) => (
                <ReviewPhotoSlide
                  key={i}
                  imgs={slide}
                  offset={i * 7}
                  onPhotoClick={openModal}
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
      )}

      {isOpen && (
        <PhotoSlideModal
          photoList={images}
          index={photoIndex}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default ReviewPhotoSection;
