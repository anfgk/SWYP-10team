import { useState } from "react";
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
  const [rating, setRating] = useState(item.rating);
  const navigate = useNavigate();

  const handleWrite = () => {
    navigate("/reviewwrite", { state: { reviewData: item } });
  };

  const handleCancelEdit = () => {
    setEditText("");
  };

  // 별점 변경 핸들러
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onRatingChange(item.id, newRating);
  };

  return (
    <div className="flex gap-4 p-4 rounded-lg">
      {/* 장소 이미지 */}
      <div className="w-32 h-32 lex-shrink-0">
        <h3 className="text-lg font-semibold text-black mb-3">{item.place}</h3>
        <img
          src="/assets/place.png"
          alt={item.place}
          className="w-[150px] h-[150px] object-cover rounded-lg"
        />
      </div>

      {/* 장소 정보 및 리뷰 */}
      <div className="flex-1 mt-10">
        <div className="w-145 flex justify-between items-center ">
          <StarRating rating={rating} onRatingChange={handleRatingChange} />
          {/* 저장/취소 버튼 - 수정 모드일 때만 표시 */}
          {editingId === item.id && (
            <div className="flex gap-2 mb-3">
              <Button
                onClick={() => onSaveEdit(item.id, editText)}
                variant="default"
                className="bg-green-500 hover:bg-green-600"
              >
                저장
              </Button>
              <Button onClick={handleCancelEdit} variant="secondary">
                취소
              </Button>
            </div>
          )}
          {/* 수정/삭제 버튼 - 읽기 모드일 때만 표시 */}
          {item.hasReview && item.review && editingId !== item.id && (
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
          )}

          {/* 리뷰 작성하기 버튼 - 리뷰가 없을 때만 표시 */}
          {!item.hasReview && (
            <div className="flex gap-2 mb-3">
              <Button
                onClick={handleWrite}
                variant="default"
                className="bg-green-500 hover:bg-green-600"
              >
                리뷰 작성하기
              </Button>
            </div>
          )}
        </div>

        {/* 리뷰가 있는 경우 */}
        {item.hasReview && item.review ? (
          <>
            {/* 수정 모드인 경우 */}
            {editingId === item.id ? (
              <>
                {/* 수정용 텍스트 영역 */}
                <div className="mb-2">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    placeholder="text"
                    className="w-150 h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={2000}
                  />
                </div>

                {/* 글자수 카운트 */}
                <div className="absolute bottom-98 right-100 text-sm text-gray-500">
                  {editText.length}/2000
                </div>
              </>
            ) : (
              <>
                {/* 읽기 전용 텍스트 영역 */}
                <div className="mb-2">
                  <textarea
                    value={item.review}
                    readOnly
                    className="w-150 h-24 p-3 rounded-lg resize-none border border-gray-200"
                    maxLength={2000}
                  />
                </div>

                {/* 글자수 카운트 */}
                <div className="absolute bottom-98 right-100 text-sm text-gray-500">
                  {item.review.length}/2000
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {/* 리뷰가 없는 경우 */}
            <div className="mb-3">
              <div className="w-150 h-24 p-3 rounded-lg resize-none border border-gray-200">
                아직 리뷰를 작성하지 않았습니다!
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewItem;
