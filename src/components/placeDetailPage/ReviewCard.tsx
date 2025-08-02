import MainCard from "../mainPage/MainCard";
import StarsFromRating from "./StarsFromRating";
import ReportModal from "../modals/ReportModal";
import SVGIcons from "../common/SVGIcons";

import { useState } from "react";
import type { ReviewData } from "@/types/types";
import { formatDateToString } from "@/lib/placeDetailUtils";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { heartClickedWithLogin } from "@/lib/reviewUtils";
import { loginConfirmAlert } from "@/lib/commonUtils";
import { useModalOpenClose } from "@/hooks/useModalOpenClose";

interface Props {
  reviewData: ReviewData;
}

const ReviewCard = ({ reviewData }: Props) => {
  const [likedAmount, setLikedAmount] = useState(reviewData.heartCount);
  const [likeChecked, setLikeChecked] = useState(reviewData.isLiked ?? false);
  const { user } = useAuthStore();
  const isLoggedIn = !!user;
  const navigate = useNavigate();

  const { isOpen, setIsOpen } = useModalOpenClose();

  return (
    <div className="w-full h-[212px] flex flex-col border-b-[1px] border-[var(--search-element-border)] gap-[8px]">
      <div className="w-full h-[24px] flex gap-[16px] items-center">
        {/* 프로필 */}
        <div className="w-fit h-[24px] flex gap-[8px] items-center">
          <img
            src={reviewData.profileImg}
            className="w-[24px] h-[24px] rounded-[67.5px]"
          />
          <p className="w-fit text-[14px]">{reviewData.name}</p>
        </div>
        {/* 날짜 */}
        <p className="text-[11px]">{formatDateToString(reviewData.date)}</p>
      </div>
      <div className="w-full h-[141px] flex gap-[16px]">
        {/* 썸네일 */}
        <MainCard
          className="w-[212px] h-full bg-cover cursor-pointer"
          style={{ backgroundImage: `url(${reviewData.thumbnail})` }}
          onClick={() => alert("모달창 오픈 넣는자리 " + reviewData.id)}
        />
        <div className="w-[972px] h-full flex flex-col gap-[8px]">
          <div className="w-full h-[24px] flex justify-between items-center">
            {/* 별점 */}
            <StarsFromRating rating={reviewData.rating} />
            {/* 좋아요 */}
            <div className="w-fit flex gap-[2px]">
              <button
                className="w-[24px] h-[24px] cursor-pointer"
                onClick={() => {
                  isLoggedIn
                    ? heartClickedWithLogin(
                        reviewData.id,
                        likeChecked,
                        setLikeChecked,
                        likeChecked,
                        setLikedAmount
                      )
                    : loginConfirmAlert(navigate);
                }}
              >
                <SVGIcons
                  name="placedetailHeart"
                  width={24}
                  height={24}
                  color={
                    likeChecked ? "var(--main-color)" : "var(--place-neutral)"
                  }
                />
              </button>
              <p className="w-fit h-[22px] text-[16px]">{likedAmount}</p>
            </div>
          </div>
          {/* 리뷰 내용 */}
          <p className="w-full h-[109px] overflow-y-auto rounded-[16px] border-[1px] border-[var(--search-element-border)] text-[16px] px-[18px] py-[16px] whitespace-pre-wrap">
            {reviewData.content}
          </p>
        </div>
      </div>
      <button
        className="w-[25px] h-[20px] ml-auto text-[14px] font-semibold cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        신고
      </button>
      {isOpen && (
        <ReportModal onClose={() => setIsOpen(false)} reviewId="test" />
      )}
    </div>
  );
};

export default ReviewCard;
