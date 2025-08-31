import PlannerEscapeModal from "@/components/modals/PlannerEscapeModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  setIsResultOpen: (v: boolean) => void;
  isResultOpen: boolean;
}
const ResultSideBarIndicator = ({ setIsResultOpen, isResultOpen }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header
      className="w-full min-h-[62px] px-[26px] rounded-[24px] flex items-center justify-between bg-white"
      style={{
        boxShadow: `0px 0px 1px 0px rgba(0, 0, 0, 0.08),
            0px 1px 4px 0px rgba(0, 0, 0, 0.08),
            0px 2px 8px 0px rgba(0, 0, 0, 0.12)`,
      }}
    >
      <button
        className="w-[62px] h-full flex items-center justify-center cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img src="/assets/logo/mini_logo.png" className="w-[52px] h-[24px]" />
      </button>
      <button
        className="w-[24px] h-[24px] flex justify-center items-center cursor-pointer"
        onClick={() =>
          isResultOpen ? setIsResultOpen(false) : setIsResultOpen(true)
        }
      >
        <img
          className="w-full h-full"
          src={`/assets/icons/menu_${isResultOpen ? "close" : "open"}.png`}
        />
      </button>

      {/* 나가기 모달 */}
      {isModalOpen && (
        <PlannerEscapeModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => navigate("/", { replace: true })}
        />
      )}
    </header>
  );
};

export default ResultSideBarIndicator;
