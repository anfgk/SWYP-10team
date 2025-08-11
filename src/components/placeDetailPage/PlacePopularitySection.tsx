import { useAuthStore } from "@/stores/authStore";
import SVGIcons from "../common/SVGIcons";
import { copyPlacePage } from "@/lib/commonUtils";
import { heartClickedWithLogin } from "@/lib/placeDetailUtils";
import { loginConfirmAlert } from "@/lib/commonUtils";
import { useNavigate } from "react-router-dom";
import { usePlacePopularity } from "@/hooks/usePlacePopularity";

interface Props {
  placeId: string;
  likedCount: number;
  viewCount: number;
  isLiked: boolean;
}
const PlacePupularitySection = ({
  placeId,
  likedCount,
  viewCount,
  isLiked,
}: Props) => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const { likeChecked, likedAmount, setLikeChecked, setLikedAmount } =
    usePlacePopularity({
      likedCount,
      isLiked,
      placeId,
      isLoggedIn,
    });

  return (
    <section className="w-full h-[73px] flex flex-col gap-[16px] py-[16px] text-[var(--place-neutral)]">
      <div className="w-full h-[24px] flex justify-between">
        <div className="w-[110px] flex gap-[16px]">
          <div className="w-fit flex gap-[4px]">
            <button
              className="w-[24px] h-[24px] cursor-pointer"
              onClick={() => {
                isLoggedIn
                  ? heartClickedWithLogin(
                      placeId,
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
                  likeChecked
                    ? "var(--main-color)"
                    : "var(--place-detail-heart)"
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
          className="w-[75px] h-[24px] flex gap-[2px] items-center cursor-pointer transition hover:underline underline-offset-[3px]"
          onClick={() => copyPlacePage(placeId)}
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
