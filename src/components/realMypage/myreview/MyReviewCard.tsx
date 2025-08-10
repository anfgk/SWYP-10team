import DefaultButtonCancel from "@/components/common/DefaultButtonCancel";
import DefaultButtonConfirm from "@/components/common/DefaultButtonConfirm";
import StarsFromRating from "@/components/placeDetailPage/review/StarsFromRating";
import MainCard from "@/components/mainPage/MainCard";
import type { MyReviewData } from "@/types/apiResponseTypes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePhotoModalStore } from "@/stores/photoModalStore";
import ReviewDeleteModal from "@/components/modals/ReviewDeleteModal";
import { deleteReview } from "@/lib/reviewWriteUtils";

interface Props {
  review: MyReviewData;
}
const MyReviewCard = ({ review }: Props) => {
  const { modalOpen } = usePhotoModalStore();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-full h-[229px] flex border-b-[1px] border-[(--search-element-border)]">
      <div className="w-full h-[212px] flex flex-col gap-[8px]">
        <div className="w-full h-[36px] flex justify-between">
          <div className="w-fit h-full flex gap-[8px] items-center">
            <p className="w-fit text-[20px] font-semibold">
              {review.contentTitle}
            </p>
            <StarsFromRating rating={review.score} />
          </div>
          <div className="w-[164px] h-full flex justify-between">
            <DefaultButtonConfirm
              w={77}
              h={36}
              text="수정하기"
              textSize={14}
              onClick={() => navigate(`/reviewedit/${review.reviewId}`)}
            />
            <DefaultButtonCancel
              w={77}
              h={36}
              text="삭제하기"
              textSize={14}
              onClick={() => setIsOpen(true)}
            />
          </div>
        </div>
        {/* 리뷰 내용 */}
        <div className="w-full h-[168px] flex flex-col gap-[12px]">
          {/* 사진 */}
          {review.images.length > 0 && (
            <div className="w-full h-[56px] flex gap-[8px]">
              {review.images.map((image, i) => (
                <MainCard
                  key={i}
                  className={`w-[76px] h-full cursor-pointer`}
                  onClick={() => modalOpen(review.images, i)}
                >
                  <img
                    src={
                      image.imageUrl ??
                      "/assets/images/common/default_thumbnail.png"
                    }
                    className="w-full h-full object-cover object-center"
                  />
                </MainCard>
              ))}
            </div>
          )}
          <div className="w-full min-h-[100x] flex-1 rounded-[16px] px-[18px] py-[14px] border-[1px] border-[var(--textarea-border)] text-[16px] text-[var(--label-normal)]">
            {review.content}
          </div>
        </div>
      </div>
      {isOpen && (
        <ReviewDeleteModal
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            deleteReview(review.reviewId.toString());
            setIsOpen(false);
            alert("리뷰가 삭제되었습니다.");
            navigate("/myreview", { state: { refreshReviews: true } });
          }}
        />
      )}
    </div>
  );
};

export default MyReviewCard;
