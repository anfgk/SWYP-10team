import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../ui/button";
import PrivacyPolicyModal from "../mypage/PrivacyPolicyModal";
import TermsOfServiceModal from "../mypage/TermsOfServiceModal";

const MainFooter = () => {
  const navigate = useNavigate();
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  return (
    <>
      <footer className="flex justify-center items-center w-full h-[343.91px] border-t-[1px] border-[var(--footer-border)]">
        <div className="flex flex-col justify-center gap-[46px] w-[471px] h-[239.1px]">
          <div className="flex gap-3">
            <Button
              className="w-20 cursor-pointer"
              onClick={() => navigate("/myinfo")}
            >
              내 정보
            </Button>
            <Button
              className="w-20 cursor-pointer"
              onClick={() => navigate("/myreview")}
            >
              내 리뷰
            </Button>
            <Button
              className="w-20 cursor-pointer"
              onClick={() => navigate("/wish")}
            >
              위시리스트
            </Button>
            <Button
              className="w-20 cursor-pointer"
              onClick={() => navigate("/reviewwrite")}
            >
              리뷰 작성
            </Button>
          </div>
          <img src="/assets/logo/footer_logo.png" alt="footer_logo" />
          <div className="flex flex-col items-center gap-[21px] w-[460px] h-[134.91px]">
            <div className="flex justify-between text-center w-[360px] h-[27.91px]">
              <p
                className="text-[14px] cursor-pointer hover:text-gray-600"
                onClick={() => setIsPrivacyModalOpen(true)}
              >
                이용약관
              </p>
              <p
                className="text-[14px] cursor-pointer hover:text-gray-600"
                onClick={() => setIsTermsModalOpen(true)}
              >
                이용약관
              </p>
              <p className="text-[14px]">개인정보처리방침</p>
            </div>
            <div className="w-[460px] h-[86px] flex flex-col gap-[12px]">
              <p className="text-[14px] text-center">
                © 2025 어디가냥?같이가개! All rights reserved.
              </p>
              <p className="text-[12px] text-center">
                이 서비스는 비영리 포트폴리오 목적으로 기획된 반려동물 동반 장소
                정보 제공 플랫폼입니다. 결제 및 중개 기능 없이 단순 정보
                제공만을 목적으로 하며, 상업적 목적은 없습니다.
              </p>
              <p className="text-[12px] text-center">
                문의 및 피드백: jeongmin2732@gmail.com
              </p>
            </div>
          </div>
        </div>
      </footer>

      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <TermsOfServiceModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </>
  );
};

export default MainFooter;
