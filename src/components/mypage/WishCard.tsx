import SvgButton from "@/components/common/SvgButton";
import { useAuthStore } from "@/stores/authStore";
import { useSearchResultCard } from "@/hooks/useSearchResultCard";
import { heartClickedWithLogin } from "@/lib/searchResultCardUtils";
import { loginConfirmAlert } from "@/lib/commonUtils";
import { useNavigate } from "react-router-dom";
import { copyPlacePage } from "@/lib/commonUtils";

interface WishCardProps {
  id: number;
  name: string;
  image?: string;
  imageUrl?: string;
  description?: string;
  isWish: boolean;
  onToggleWish: (id: number) => void;
}

const WishCard = ({
  id,
  name,
  image,
  imageUrl,
  description,
  isWish,
  onToggleWish,
}: WishCardProps) => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const { liked, setLiked } = useSearchResultCard({
    isLoggedIn,
    isLiked: Boolean(isWish),
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-45 h-30 bg-gray-300 rounded-lg overflow-hidden cursor-pointer">
        {image || imageUrl ? (
          <img
            src={image || imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error("이미지 로드 실패:", image || imageUrl);
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div
          className={`w-full h-full bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 cursor-pointer ${image || imageUrl ? "hidden" : ""}`}
        >
          장소 이미지
        </div>

        {/* 이미지 위에 오버레이 버튼들 */}
        <div className="absolute bottom-2 right-2 flex gap-2 cursor-pointer">
          {/* 찜하기 버튼 */}
          <SvgButton
            svgname={
              isLoggedIn
                ? liked
                  ? "thumbnailHeartClicked"
                  : "thumbnailHeart"
                : "thumbnailHeart"
            }
            width={40}
            height={40}
            onClick={() => {
              isLoggedIn
                ? heartClickedWithLogin(id.toString(), liked, setLiked)
                : loginConfirmAlert(navigate);
            }}
          />

          {/* 공유하기 버튼 - GoShareAndroid 아이콘으로 변경 */}
          <SvgButton
            svgname="thumbnailShare"
            width={40}
            height={40}
            onClick={() => copyPlacePage(id.toString())}
          />
        </div>
      </div>
      <div className="text-sm font-medium text-gray-800">{name}</div>
      {description && (
        <div className="text-xs text-gray-600">{description}</div>
      )}
    </div>
  );
};

export default WishCard;
