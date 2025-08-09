import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ReviewButtonsProps {
  isEditing: boolean;
  hasReview: boolean;
  item: any;
  editText: string;
  onSaveEdit: (id: number, text: string) => void;
  onDelete: () => void;
  onCancel: () => void;
}

const ReviewButtons = ({
  isEditing,
  hasReview,
  item,
  editText,
  onSaveEdit,
  onDelete,
  onCancel,
}: ReviewButtonsProps) => {
  const navigate = useNavigate();
  const buttonStyle = "hover:bg-[var(--main-color)] hover:text-white";

  if (isEditing) {
    return (
      <div className="flex gap-2">
        <Button
          onClick={() => onSaveEdit(item.id, editText)}
          variant="secondary"
          className={buttonStyle}
        >
          저장하기
        </Button>
        <Button onClick={onCancel} variant="secondary" className={buttonStyle}>
          취소하기
        </Button>
      </div>
    );
  }

  if (hasReview) {
    return (
      <div className="flex gap-3 mb-5">
        <Button
          onClick={() =>
            navigate("/reviewwrite", { state: { reviewData: item } })
          }
          variant="secondary"
          className={buttonStyle}
        >
          수정하기
        </Button>
        <Button onClick={onDelete} variant="secondary" className={buttonStyle}>
          삭제하기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2 mb-3">
      <Button
        onClick={() =>
          navigate("/reviewwrite", { state: { reviewData: item } })
        }
        variant="secondary"
        className={buttonStyle}
      >
        리뷰 작성하기
      </Button>
    </div>
  );
};

export default ReviewButtons;
