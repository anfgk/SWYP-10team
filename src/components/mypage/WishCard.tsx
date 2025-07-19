import { GoHeartFill, GoHeart } from "react-icons/go";

interface WishCardProps {
  id: number;
  name: string;
  isWished: boolean;
  onToggleWish: (id: number) => void;
}

const WishCard = ({ id, name, isWished, onToggleWish }: WishCardProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-full h-32 bg-gray-300 rounded-lg overflow-hidden">
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
        <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
          장소 이미지
        </div>
      </div>
      <div className="text-sm font-medium text-gray-800">{name}</div>
    </div>
  );
};

export default WishCard;
