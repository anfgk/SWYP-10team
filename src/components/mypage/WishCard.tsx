import { GoHeartFill, GoHeart } from "react-icons/go";
import { GoShareAndroid } from "react-icons/go";

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
  const handleShare = async () => {
    // 공유하기 기능 구현
    if (navigator.share) {
      try {
        await navigator.share({
          title: name,
          text: description || `${name} - 반려동물과 함께하는 장소`,
          url: window.location.href,
        });
      } catch (error) {
        // 사용자가 공유를 취소하거나 에러가 발생한 경우 무시
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("공유하기 실패:", error);
        }
      }
    } else {
      // 공유 API가 지원되지 않는 경우 클립보드에 복사
      try {
        const shareText = `${name} - 반려동물과 함께하는 장소\n${window.location.href}`;
        await navigator.clipboard.writeText(shareText);
        alert("링크가 클립보드에 복사되었습니다.");
      } catch (error) {
        console.error("클립보드 복사 실패:", error);
        alert("링크 복사에 실패했습니다.");
      }
    }
  };

  const handleWishToggle = async () => {
    try {
      await onToggleWish(id);
      // 성공적으로 찜하기가 토글되면 부모 컴포넌트에서 목록을 새로고침함
    } catch (error) {
      console.error("찜하기 토글 실패:", error);
    }
  };

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
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleWishToggle();
            }}
            className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-black/70 transition-colors cursor-pointer"
          >
            {isWished ? (
              <GoHeartFill className="text-red-500 text-lg" />
            ) : (
              <GoHeart className="text-white text-lg" />
            )}
          </button>

          {/* 공유하기 버튼 - GoShareAndroid 아이콘으로 변경 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-black/70 transition-colors"
          >
            <GoShareAndroid className="text-white text-lg" />
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
