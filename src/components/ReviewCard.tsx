import React from "react";
import PageButton from "@/components/ui/page-button";

interface ReviewCardProps {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  onWrite: () => void;
}

const ReviewCard = ({ item, onEdit, onDelete, onWrite }: ReviewCardProps) => {
  return (
    <div className="flex gap-8 items-start">
      <div className="w-40 h-32 bg-[var(--sidebar-ring)]" />
      <div className="flex-1">
        <div className="text-lg font-semibold mb-2">{item.place}</div>
        {item.hasReview || item.review ? (
          <div className="flex gap-2 mb-2">
            <PageButton text="수정" onClick={() => onEdit(item)} />
            <PageButton text="삭제" onClick={() => onDelete(item)} />
          </div>
        ) : (
          <div className="flex gap-2 mb-2">
            <PageButton
              text="리뷰 작성하기"
              variant="default"
              onClick={onWrite}
            />
          </div>
        )}
        <div className="bg-[var(--sidebar-ring)] p-3 rounded">
          {item.hasReview || item.review
            ? item.review
            : "아직 리뷰를 작성하지 않았습니다! 리뷰를 작성해주세요!"}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
