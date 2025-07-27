import StarRating from "./StarRating";

interface ReviewHeaderProps {
  place: string;
  rating: number;
  isEditing?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

const ReviewHeader = ({
  place,
  rating,
  isEditing = false,
  onRatingChange,
  size = "lg",
}: ReviewHeaderProps) => {
  return (
    <div className="flex items-center gap-2 mb-3">
      <h3 className="text-lg font-semibold text-black">{place}</h3>
      <StarRating
        rating={rating}
        onRatingChange={onRatingChange || (() => {})}
        size={size}
      />
    </div>
  );
};

export default ReviewHeader;
