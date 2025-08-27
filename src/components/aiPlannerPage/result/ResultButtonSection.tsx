import DefaultButtonCancel from "@/components/common/DefaultButtonCancel";
import DefaultButtonConfirm from "@/components/common/DefaultButtonConfirm";
import PlannerEscapeModal from "@/components/modals/PlannerEscapeModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResultButtonSection = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="w-full h-[36px] flex gap-[8px] justify-end">
      <DefaultButtonConfirm
        w={77}
        h={36}
        text="저장하기"
        textSize={14}
        onClick={() => alert("pdf export")}
      />
      <DefaultButtonCancel
        w={77}
        h={36}
        text="취소하기"
        textSize={14}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <PlannerEscapeModal
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            navigate("/", { replace: true });
            // store 비우는 기능
          }}
        />
      )}
    </section>
  );
};

export default ResultButtonSection;
