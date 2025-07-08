import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface ReviewFormProps {
  reviewText: string;
  onReviewChange: (text: string) => void;
  placeholder?: string;
  height?: string;
}

const ReviewForm = ({
  reviewText,
  onReviewChange,
  placeholder = "리뷰를 작성해주세요.",
  height = "h-40",
}: ReviewFormProps) => {
  return (
    <div className="mb-8">
      <div className="mb-2 font-semibold">상세리뷰</div>
      <Textarea
        className={`${height} resize-none`}
        placeholder={placeholder}
        value={reviewText}
        onChange={(e) => onReviewChange(e.target.value)}
      />
    </div>
  );
};

export default ReviewForm;
