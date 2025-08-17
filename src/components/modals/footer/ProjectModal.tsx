import { useModalEscapeKey } from "@/hooks/useModalEscapeKey";
import DefaultButtonConfirm from "@/components/common/DefaultButtonConfirm";
import ModalBackground from "../common/ModalBackground";

interface ProjectModalProps {
  onClose: () => void;
}

const ProjectModal = ({ onClose }: ProjectModalProps) => {
  useModalEscapeKey(onClose);
  return (
    <ModalBackground onClose={onClose}>
      <div
        className="bg-white rounded-lg p-8 w-[448px] h-[285px] overflow-y-auto relative"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6 text-sm text-gray-700">
          <div className="mb-6">
            <h2 className="text-[18px] font-bold mb-6 text-gray-800">
              어디가냥? 같이가개! 프로젝트 소개
            </h2>
            <p>
              어디가냥? 같이가개!는 반려동물과 함께할 수 있는 장소를 쉽고 빠르게
              찾을 수 있는 플랫폼입니다. 위치 기반 검색, AI 추천, 그리고 실제
              이용자 리뷰로 여러분의 반려동물과 더 즐겁고 편리한 외출을
              도와드립니다. SWYP 웹기획 10팀이 만든 사이드 프로젝트로,
              반려인들의 행복한 하루를 응원합니다.
            </p>
          </div>
          <div className="flex justify-center mt-8">
            <DefaultButtonConfirm
              w={120}
              h={40}
              text="확인"
              textSize={14}
              onClick={onClose || (() => {})}
            />
          </div>
        </div>
      </div>
    </ModalBackground>
  );
};

export default ProjectModal;
