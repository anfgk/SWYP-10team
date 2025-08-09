import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReviewHeader from "./ReviewHeader";
import ConfirmModal from "./ConfirmModal";
import ModalButton from "@/components/modals/common/ModalButton";

// 리뷰 정보를 담은 item 객체를 reviewItem 컴포넌트에서 전달받기위해 변수명과 타입을 지정해준다.
interface ReviewItemProps {
  item: {
    id: number;
    contentId?: number;
    place: string;
    review: string;
    hasReview: boolean;
    rating: number;
    reviewImages?: { imageUrl: string }[];
  };
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();
  const isEditing = editingId === item.id;
  const hasReview = item.hasReview && item.review;

  // 편집 모드일 때 임시 별점 상태 업데이트
  useEffect(() => {
    if (isEditing) setTempRating(item.rating);
  }, [isEditing, item.rating]);

  // 별점 변경 핸들러 (편집 모드에서만 동작)
  const handleRatingChange = (newRating: number) => {
    if (isEditing) {
      setTempRating(newRating);
      onRatingChange(item.id, newRating);
    }
  };

  // 리뷰 작성/수정 페이지로 네비게이션
  const handleNavigate = () => {
    const targetContentId = item.contentId || item.id;
    navigate(`/reviewwrite/${targetContentId}`, {
      state: { reviewData: item },
    });
  };

  // 편집/수정/삭제 버튼 렌더링
  const renderButtons = () => {
    if (isEditing) {
      return (
        <div className="flex gap-2 w-[200px]">
          <ModalButton
            onClick={() => onSaveEdit(item.id, editText)}
            text="저장하기"
            bgcolor="--main-color"
            textcolor="--main-text"
          />
          <ModalButton
            onClick={() => setShowCancelModal(true)}
            text="취소하기"
            bgcolor="--indicator-disabled"
            textcolor="--place-neutral"
          />
        </div>
      );
    }

    if (hasReview) {
      return (
        <div className="flex gap-3 mb-5 w-[200px]">
          <ModalButton
            onClick={handleNavigate}
            text="수정하기"
            bgcolor="--main-color"
            textcolor="--main-text"
          />
          <ModalButton
            onClick={() => setShowDeleteModal(true)}
            text="삭제하기"
            bgcolor="--indicator-disabled"
            textcolor="--place-neutral"
          />
        </div>
      );
    }
  };

  // 리뷰 텍스트 렌더링 (편집 모드/읽기 모드)
  const renderReviewText = () => {
    if (!hasReview) {
      return (
        <div className="w-[903px] h-[72px] p-3 rounded-lg border border-gray-200">
          아직 리뷰를 작성하지 않았습니다!
        </div>
      );
    }

    const text = isEditing ? editText : item.review;

    if (!isEditing) {
      return (
        <div className="w-[903px] h-[72px] p-3 border border-gray-200 rounded-lg">
          {text}
        </div>
      );
    }

    return (
      <section>
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
      </section>
    );
  };

  // 리뷰 이미지 렌더링
  const renderImages = () => {
    // 리뷰 이미지가 없으면 null을 반환한다.
    if (!item.reviewImages?.length) return null;

    return (
      <div className="flex gap-2 mt-[30px] mb-[12px]">
        {/* reviewList에서 전달받은 reviewImages 배열을 map method를 통해서 반복문을 돌린다. */}
        {item.reviewImages.map((reviewImage, i) => (
          // 반복문을 돌면서 image 랜더링에 필요한 정보를 꺼내와서 저장한다.
          <img
            key={i}
            src={reviewImage.imageUrl || ""}
            alt={`리뷰 이미지 ${i + 1}`}
            className="w-[75px] h-[56px] object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex p-4 rounded-lg">
      <div className="w-[0px]">
        <div className="w-[400px]">
          <ReviewHeader
            place={item.place}
            rating={isEditing ? tempRating : item.rating}
            onRatingChange={handleRatingChange}
            size="lg"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="w-[902px] flex justify-between ">
          <div className="flex flex-col">{renderImages()}</div>
          {renderButtons()}
        </div>
        <div className="mb-2">{renderReviewText()}</div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          onDelete(item);
          setShowDeleteModal(false);
        }}
        title="리뷰를 삭제하시겠어요?"
        confirmText="예"
        cancelText="아니오"
      />

      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={() => {
          setEditText("");
          setShowCancelModal(false);
        }}
        title="편집을 취소하시겠어요?"
        confirmText="예"
        cancelText="아니오"
        height="h-[266px]"
      />
    </div>
  );
};

export default ReviewItem;
