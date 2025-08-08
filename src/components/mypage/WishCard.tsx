import { GoHeartFill, GoHeart } from "react-icons/go";
import { IoShareOutline } from "react-icons/io5";

interface WishCardProps {
  id: number;
  name: string;
  image?: string;
  imageUrl?: string;
  description?: string;
  isWished: boolean;
  onToggleWish: (id: number) => void;
}

const WishCard = ({
  id,
  name,
  image,
  imageUrl,
  description,
  isWished,
  onToggleWish,
}: WishCardProps) => {
  const handleShare = () => {
    // 공유하기 기능 구현
    if (navigator.share) {
      navigator.share({
        title: name,
        text: description || `${name} - 반려동물과 함께하는 장소`,
        url: window.location.href,
      });
    } else {
      // 공유 API가 지원되지 않는 경우 클립보드에 복사
      const shareText = `${name} - 반려동물과 함께하는 장소\n${window.location.href}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert("링크가 클립보드에 복사되었습니다.");
      });
    }
  };

  const handleWishToggle = async () => {
    try {
      await onToggleWish(id);
      // 성공적으로 찜하기가 취소되면 페이지 새로고침
      window.location.reload();
    } catch (error) {
      console.error("찜하기 취소 실패:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-45 h-30 bg-gray-300 rounded-lg overflow-hidden">
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
          className={`w-full h-full bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 ${image || imageUrl ? "hidden" : ""}`}
        >
          장소 이미지
        </div>

        {/* 이미지 위에 오버레이 버튼들 - 이미지에서 본 것처럼 */}
        <div className="absolute bottom-2 right-2 flex gap-2">
          {/* 찜하기 버튼 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWishToggle();
            }}
            className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-black/70 transition-colors"
          >
            {isWished ? (
              <GoHeartFill className="text-red-500 text-lg" />
            ) : (
              <GoHeart className="text-white text-lg" />
            )}
          </button>

          {/* 공유하기 버튼 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-black/70 transition-colors"
          >
            <IoShareOutline className="text-white text-lg" />
          </button>
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
