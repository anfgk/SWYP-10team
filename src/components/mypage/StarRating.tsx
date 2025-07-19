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
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
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
        <span className="text-[var(--sidebar-ring)]">★</span>

        {/* 앞쪽 별 (노란색) */}
        <span
          className={`absolute top-0 left-0 cursor-pointer transition-all duration-100 ${
            isFull
              ? "text-yellow-400"
              : isHalf
                ? "text-yellow-400 w-1/2 overflow-hidden"
                : "text-transparent"
          }`}
          onClick={() => handleStarClick(starIndex, false)}
        >
          ★
        </span>

        {/* 절반 별 클릭 영역 */}
        <span
          className="absolute top-0 left-0 w-1/2 h-full cursor-pointer"
          onClick={() => handleStarClick(starIndex, true)}
        />

        {/* 나머지 절반 클릭 영역 */}
        <span
          className="absolute top-0 left-1/2 w-1/2 h-full cursor-pointer"
          onClick={() => handleStarClick(starIndex, false)}
        />
      </div>
    );
  };

  return (
    <div className={`flex gap-1 ${sizeClasses[size]}`}>
      {Array.from({ length: 5 }).map((_, i) => renderStar(i))}
    </div>
  );
};

export default StarRating;
