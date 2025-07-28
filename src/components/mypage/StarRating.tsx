import { TiStarFullOutline } from "react-icons/ti";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

const StarRating = ({
  rating,
  onRatingChange,
  size = "lg",
}: StarRatingProps) => {
  const sizeClasses = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };
  const starSize = sizeClasses[size];

  const handleStarClick = (starIndex: number, isHalf: boolean) => {
    onRatingChange(starIndex + (isHalf ? 0.5 : 1));
  };

  const renderStar = (starIndex: number) => {
    const starValue = starIndex + 1;
    const halfStarValue = starIndex + 0.5;
    const isFull = rating >= starValue;
    const isHalf = rating >= halfStarValue && rating < starValue;

    return (
      <div key={starIndex} className="relative inline-block">
        <TiStarFullOutline className={`text-gray-300 ${starSize}`} />

        {isFull ? (
          <TiStarFullOutline
            className={`absolute top-0 left-0 cursor-pointer transition-all duration-100 text-[var(--main-color)] ${starSize}`}
            onClick={() => handleStarClick(starIndex, false)}
          />
        ) : isHalf ? (
          <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
            <TiStarFullOutline
              className={`cursor-pointer transition-all duration-100 text-[var(--main-color)] ${starSize}`}
              onClick={() => handleStarClick(starIndex, false)}
            />
          </div>
        ) : null}

        <span
          className="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-10"
          onClick={() => handleStarClick(starIndex, true)}
        />
        <span
          className="absolute top-0 left-1/2 w-1/2 h-full cursor-pointer z-10"
          onClick={() => handleStarClick(starIndex, false)}
        />
      </div>
    );
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => renderStar(i))}
    </div>
  );
};

export default StarRating;
