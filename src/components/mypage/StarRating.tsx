import { TiStarFullOutline, TiStarHalfOutline } from "react-icons/ti";

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
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleStarClick = (starIndex: number, isHalf: boolean) => {
    const newRating = starIndex + (isHalf ? 0.5 : 1);
    onRatingChange(newRating);
  };

  const renderStar = (starIndex: number) => {
    const starValue = starIndex + 1;
    const halfStarValue = starIndex + 0.5;

    // 현재 별점이 이 별의 절반보다 크면 완전히 채워짐
    const isFull = rating >= starValue;
    // 현재 별점이 이 별의 절반보다 크고 완전히 채워지지 않았으면 절반만 채워짐
    const isHalf = rating >= halfStarValue && rating < starValue;

    return (
      <div key={starIndex} className="relative inline-block">
        {/* 배경 별 (회색) */}
        <TiStarFullOutline className={`text-gray-300 ${sizeClasses[size]}`} />

        {/* 앞쪽 별 (메인 컬러) */}
        {isFull ? (
          <TiStarFullOutline
            className={`absolute top-0 left-0 cursor-pointer transition-all duration-100 text-[var(--main-color)] ${sizeClasses[size]}`}
            onClick={() => handleStarClick(starIndex, false)}
          />
        ) : isHalf ? (
          <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
            <TiStarFullOutline
              className={`cursor-pointer transition-all duration-100 text-[var(--main-color)] ${sizeClasses[size]}`}
              onClick={() => handleStarClick(starIndex, false)}
            />
          </div>
        ) : null}

        {/* 절반 별 클릭 영역 */}
        <span
          className="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-10"
          onClick={() => handleStarClick(starIndex, true)}
        />

        {/* 나머지 절반 클릭 영역 */}
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
