import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";

interface ReviewItemProps {
  item: {
    id: number;
    place: string;
    review: string;
    hasReview: boolean;
    rating: number;
  };
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  onSaveEdit: (id: number, text: string) => void;
  onRatingChange: (id: number, rating: number) => void;
  editingId: number | null;
  editText: string;
  setEditText: (text: string) => void;
}

const ReviewItem = ({
  item,
  onEdit,
  onDelete,
  onSaveEdit,
  onRatingChange,
  editingId,
  editText,
  setEditText,
}: ReviewItemProps) => {
  const [tempRating, setTempRating] = useState(item.rating);
  const navigate = useNavigate();
  const isEditing = editingId === item.id;
  const hasReview = item.hasReview && item.review;

  // 편집 모드 진입 시 현재 별점으로 초기화
  useEffect(() => {
    if (isEditing) {
      setTempRating(item.rating);
    }
  }, [isEditing, item.rating]);

  const handleWrite = () => {
    navigate("/reviewwrite", { state: { reviewData: item } });
  };

  const handleRatingChange = (newRating: number) => {
    if (isEditing) {
      setTempRating(newRating);
      onRatingChange(item.id, newRating);
    }
  };

  const renderButtons = () => {
    if (isEditing) {
      return (
        <div className="flex gap-2 mb-3">
          <Button
            onClick={() => onSaveEdit(item.id, editText)}
            variant="default"
            className="bg-green-500 hover:bg-green-600"
          >
            저장
          </Button>
          <Button onClick={() => setEditText("")} variant="secondary">
            취소
          </Button>
        </div>
      );
    }

    if (hasReview) {
      return (
        <div className="flex gap-2 mb-3">
          <Button
            onClick={() => onEdit(item)}
            variant="default"
            className="bg-blue-500 hover:bg-blue-600"
          >
            수정
          </Button>
          <Button onClick={() => onDelete(item)} variant="destructive">
            삭제
          </Button>
        </div>
      );
    }

    return (
      <div className="flex gap-2 mb-3">
        <Button
          onClick={handleWrite}
          variant="default"
          className="bg-green-500 hover:bg-green-600"
        >
          리뷰 작성하기
        </Button>
      </div>
    );
  };

  const renderReviewText = () => {
    if (!hasReview) {
      return (
        <div className="w-150 h-24 p-3 rounded-lg resize-none border border-gray-200">
          아직 리뷰를 작성하지 않았습니다!
        </div>
      );
    }

    const text = isEditing ? editText : item.review;
    const isReadOnly = !isEditing;

    return (
      <>
        <textarea
          value={text}
          onChange={isReadOnly ? undefined : (e) => setEditText(e.target.value)}
          readOnly={isReadOnly}
          placeholder="text"
          className="w-150 h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={2000}
        />
        <div className="absolute bottom-85 right-85 text-sm text-gray-500">
          {text.length}/2000
        </div>
      </>
    );
  };

  return (
    <div className="flex gap-4 p-4 rounded-lg">
      <div className="w-32 h-32 lex-shrink-0">
        <h3 className="text-lg font-semibold text-black mb-3">{item.place}</h3>
        <img
          src="/assets/place.png"
          alt={item.place}
          className="w-[150px] h-[150px] object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 mt-10">
        <div className="w-145 flex justify-between items-center">
          <StarRating
            rating={isEditing ? tempRating : item.rating}
            onRatingChange={handleRatingChange}
          />
          {renderButtons()}
        </div>
        <div className="mb-2">{renderReviewText()}</div>
      </div>
    </div>
  );
};

export default ReviewItem;
