import { loginConfirmAlert } from "@/lib/commonUtils";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
interface Props {
  id: string;
}
const ReviewWriteButton = ({ id }: Props) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  return (
    <div className="relative inset-0 w-full h-[212px] mb-[56px]">
      <img
        src="/assets/images/common/reviewWriteBlur.png"
        className="w-full h-full"
      />
      <button
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[514px] h-[56px] z-10 bg-[var(--main-color)] text-[var(--main-text)] rounded-[16px] cursor-pointer transition hover:brightness-95 active:brightness-92"
        onClick={() => {
          isLoggedIn
            ? navigate(`/reviewwrite/${id}`)
            : loginConfirmAlert(navigate);
        }}
      >
        리뷰를 작성해주세요!
      </button>
    </div>
  );
};

export default ReviewWriteButton;
