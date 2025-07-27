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
    imageBase64s?: string[]; // 이미지 base64 배열 추가
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
        <div className="flex gap-2">
          <Button
            onClick={() => onSaveEdit(item.id, editText)}
            variant="secondary"
            className="hover:bg-[var(--main-color)] hover:text-white"
          >
            저장하기
          </Button>
          <Button
            onClick={() => setEditText("")}
            variant="secondary"
            className="hover:bg-[var(--main-color)] hover:text-white"
          >
            취소하기
          </Button>
        </div>
      );
    }

    if (hasReview) {
      return (
        <div className="flex gap-3 mb-5">
          <Button
            onClick={() => {
              console.log("수정 버튼 클릭됨", item);
              navigate("/reviewwrite", { state: { reviewData: item } });
            }}
            variant="secondary"
            className="hover:bg-[var(--main-color)] hover:text-white"
          >
            수정하기
          </Button>
          <Button
            onClick={() => onDelete(item)}
            variant="secondary"
            className="hover:bg-[var(--main-color)] hover:text-white"
          >
            삭제하기
          </Button>
        </div>
      );
    }

    return (
      <div className="flex gap-2 mb-3">
        <Button
          onClick={handleWrite}
          variant="secondary"
          className="hover:bg-[var(--main-color)] hover:text-white"
        >
          리뷰 작성하기
        </Button>
      </div>
    );
  };

  const renderReviewText = () => {
    if (!hasReview) {
      return (
        <div className="w-[903px] h-[72px] p-3 rounded-lg border border-gray-200">
          아직 리뷰를 작성하지 않았습니다!
        </div>
      );
    }

    const text = isEditing ? editText : item.review;
    const isReadOnly = !isEditing;

    if (isReadOnly) {
      return (
        <div className="w-[903px] h-[72px] p-3 border border-gray-200 rounded-lg">
          {text}
        </div>
      );
    }

    return (
      <>
        <textarea
          value={text}
          onChange={(e) => setEditText(e.target.value)}
          placeholder="text"
          className="w-150 h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-0"
          maxLength={2000}
        />
        <div className="absolute bottom-98 right-100 text-sm text-gray-500">
          {text.length}/2000
        </div>
      </>
    );
  };

  const renderImages = () => {
    if (!item.imageBase64s || item.imageBase64s.length === 0) {
      return null;
    }

    return (
      <div className="flex gap-2 mt-[30px] mb-[12px]">
        {item.imageBase64s.map((imageBase64, index) => (
          <img
            key={index}
            src={imageBase64}
            alt={`리뷰 이미지 ${index + 1}`}
            className="w-[75px] h-[56px] object-cover rounded border"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex p-4 rounded-lg">
      <div className="w-[0px]">
        <div className="w-[200px] flex items-center gap-2 mb-3">
          <h3 className="text-lg font-semibold text-black">{item.place}</h3>
          <StarRating
            rating={isEditing ? tempRating : item.rating}
            onRatingChange={handleRatingChange}
            size="lg"
          />
        </div>
      </div>

      <div className="">
        <div className="w-[902px] flex justify-between">
          <div className="flex flex-col">{renderImages()}</div>
          {renderButtons()}
        </div>
        <div className="mb-2">{renderReviewText()}</div>
      </div>
    </div>
  );
};

export default ReviewItem;
