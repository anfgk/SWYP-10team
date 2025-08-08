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

const WishCard = ({
  id,
  name,
  image,
  imageUrl,
  description,
  isWished,
  onToggleWish,
}: WishCardProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-45 h-30 bg-gray-300 rounded-lg overflow-hidden">
        {/* TODO: 백엔드에서 삭제 API 제공 시 활성화 예정 */}
        {/* 
        <button
          className="absolute top-2 right-2 text-xl focus:outline-none z-10"
          onClick={() => onToggleWish(id)}
          aria-label="찜하기"
        >
          {isWished ? (
            <GoHeartFill className="text-red-500" />
          ) : (
            <GoHeart className="text-white" />
          )}
        </button>
        */}
        {image || imageUrl ? (
          <img
            src={image || imageUrl}
            alt={name}
            className="w-45 h-30 object-cover"
          />
        ) : (
          <div className="w-45 h-30 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
            장소 이미지
          </div>
        )}
      </div>
      <div className="text-sm font-medium text-gray-800">{name}</div>
      {description && (
        <div className="text-xs text-gray-600">{description}</div>
      )}
    </div>
  );
};

export default WishCard;
