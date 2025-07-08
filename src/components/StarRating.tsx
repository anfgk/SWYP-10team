import React from "react";

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

  const handleStarClick = (starIndex: number) => {
    onRatingChange(starIndex + 1);
  };

  return (
    <div className={`flex gap-1 ${sizeClasses[size]}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`cursor-pointer outline-none transition-all duration-100 ${
            i < rating ? "text-yellow-400" : "text-[var(--sidebar-ring)]"
          }`}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
