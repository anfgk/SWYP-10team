import { useState } from "react";
import SVGIcons from "../common/SVGIcons";
import { copyCurrentUrl } from "@/lib/placeDetailUtils";
import { Toaster } from "sonner";

interface Props {
  likedCount: number;
  viewCount: number;
  isLiked: boolean;
}
const PlacePupularitySection = ({ likedCount, viewCount, isLiked }: Props) => {
  const [likedAmount, setLikedAmount] = useState(likedCount);
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
    <section className="w-full h-[73px] flex flex-col gap-[16px] py-[16px] text-[var(--place-neutral)]">
      <Toaster />
      <div className="w-full h-[24px] flex justify-between">
        <div className="w-[110px] flex gap-[16px]">
          <div className="w-fit flex gap-[4px]">
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
          <div className="w-fit flex gap-[2px]">
            <SVGIcons name="placedetailView" width={24} height={24} color="" />
            <p className="w-fit h-[22px] text-[16px]">{viewCount}</p>
          </div>
        </div>
        <button
          className="w-[75px] h-[24px] flex gap-[2px] items-center cursor-pointer"
          onClick={copyCurrentUrl}
        >
          <SVGIcons name="placedetailShare" width={24} height={24} color="" />
          <p className="w-[49px] h-[20px] text-[14px] font-semibold">
            공유하기
          </p>
        </button>
      </div>
      <hr className="w-full border-[1px] borer-[var(--search-element-border)]" />
    </section>
  );
};

export default PlacePupularitySection;
