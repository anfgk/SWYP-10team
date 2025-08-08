import { GoHeartFill, GoHeart } from "react-icons/go";

interface WishCardProps {
  id: number;
  name: string;
  image?: string;
  imageUrl?: string;
  description?: string;
  isWished: boolean;
  onToggleWish: (id: number) => void;
}

const WishCard = ({ name, image, imageUrl, description }: WishCardProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-45 h-30 bg-gray-300 rounded-lg overflow-hidden">
        {image || imageUrl ? (
          <img
            src={image || imageUrl}
            alt={name}
            className="w-45 h-30 object-cover"
            onError={(e) => {
              console.error("이미지 로드 실패:", image || imageUrl);
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div
          className={`w-45 h-30 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 ${image || imageUrl ? "hidden" : ""}`}
        >
          장소 이미지
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
