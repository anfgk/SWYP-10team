import { GoHeartFill, GoHeart } from "react-icons/go";

interface WishCardProps {
  id: number;
  name: string;
  isWished: boolean;
  onToggleWish: (id: number) => void;
}

const WishCard = ({ id, name, isWished, onToggleWish }: WishCardProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-32 h-32 bg-gray-300">
        <button
          className="absolute right-2 bottom-2 text-xl focus:outline-none"
          onClick={() => onToggleWish(id)}
          aria-label="찜하기"
        >
          {isWished ? (
            <GoHeartFill className="text-black" />
          ) : (
            <GoHeart className="text-black" />
          )}
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span>{name}</span>
      </div>
    </div>
  );
};

export default WishCard;
