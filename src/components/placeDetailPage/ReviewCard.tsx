import MainCard from "../mainPage/MainCard";
import StarsFromRating from "./StarsFromRating";
import SVGIcons from "../layout/SVGIcons";

import { useState } from "react";
import type { ReviewData } from "@/types/types";
import { formatDateToString } from "@/lib/placeDetailUtils";

const ReviewCard = ({
  id,
  profileImg,
  name,
  date,
  rating,
  content,
  heartCount,
  isLiked,
  thumbnail,
}: ReviewData) => {
  const [likedAmount, setLikedAmount] = useState(heartCount);
  const [likeChecked, setLikeChecked] = useState(isLiked);

  const handleLikeClick = () => {
    if (likeChecked) {
      setLikedAmount((prev) => prev - 1);
    } else {
      setLikedAmount((prev) => prev + 1);
    }

    setLikeChecked(!likeChecked);
  };
  return (
    <div className="w-full h-[212px] flex flex-col border-b-[1px] border-[var(--search-element-border)] gap-[8px]">
      <div className="w-full h-[24px] flex gap-[16px] items-center">
        {/* 프로필 */}
        <div className="w-fit h-[24px] flex gap-[8px] items-center">
          <img
            src={profileImg}
            className="w-[24px] h-[24px] rounded-[67.5px]"
          />
          <p className="w-fit text-[14px]">{name}</p>
        </div>
        {/* 날짜 */}
        <p className="text-[11px]">{formatDateToString(date)}</p>
      </div>
      <div className="w-full h-[141px] flex gap-[16px]">
        {/* 썸네일 */}
        <MainCard
          className="w-[212px] h-full bg-cover cursor-pointer"
          style={{ backgroundImage: `url(${thumbnail})` }}
          onClick={() => alert("모달창 오픈 넣는자리 " + id)}
        />
        <div className="w-[972px] h-full flex flex-col gap-[8px]">
          <div className="w-full h-[24px] flex justify-between items-center">
            {/* 별점 */}
            <StarsFromRating rating={rating} />
            {/* 좋아요 */}
            <div className="w-fit flex gap-[2px]">
              <button
                className="w-[24px] h-[24px] cursor-pointer"
                onClick={handleLikeClick}
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
            {content}
          </p>
        </div>
      </div>
      <button
        className="w-[25px] h-[20px] ml-auto text-[14px] font-semibold cursor-pointer"
        onClick={() => alert("신고 모달 오픈 넣는자리 " + id)}
      >
        신고
      </button>
    </div>
  );
};

export default ReviewCard;
