import PrivacyPolicyModal from "../modals/footer/PrivacyPolicyModal";
import ProjectModal from "../modals/footer/ProjectModal";
import TermsOfServiceModal from "../modals/footer/TermsOfServiceModal";
import { useState } from "react";

const MainFooter = () => {
  const [privacyOpen, setPravacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);

  return (
    <footer className="flex flex-col justify-center items-center w-full h-[301px] py-[32px] gap-[44px]">
      <img
        src="/assets/logo/footer_logo.png"
        alt="footer_logo"
        className="w-[471px]"
      />
      <div className="flex flex-col justify-center items-center gap-[16px] w-[460px] h-[134px]">
        <div className="flex justify-between items-center w-[402px] h-[22px] text-[var(--label-normal)]">
          <p
            className="text-[16px] cursor-pointer hover:underline"
            onClick={() => setTermsOpen(true)}
          >
            이용약관
          </p>
          <div className="w-px h-[16px] bg-[var(--search-element-border)]" />
          <p
            className="text-[16px] cursor-pointer hover:underline"
            onClick={() => setPravacyOpen(true)}
          >
            개인정보처리방침
          </p>
          <div className="w-px h-[16px] bg-[var(--search-element-border)]" />
          <p
            className="text-[16px] cursor-pointer hover:underline"
            onClick={() => setProjectOpen(true)}
          >
            프로젝트소개
          </p>
        </div>

        <div className="w-[501px] h-[96px] flex flex-col gap-[8px] text-[var(--place-neutral)]">
          <p className="text-[14px] text-center">
            © 2025 어디가냥?같이가개! All rights reserved.
          </p>
          <p className="text-[14px] text-center font-semibold">
            이 서비스는 비영리 포트폴리오 목적으로 기획된 반려동물 동반 장소
            정보 제공 플랫폼입니다. 결제 및 중개 기능 없이 단순 정보 제공만을
            목적으로 하며, 상업적 목적은 없습니다.
          </p>
          <p className="text-[14px] text-center">
            문의 및 피드백: jeongmin2732@gmail.com
          </p>
        </div>
      </div>
      {termsOpen && <TermsOfServiceModal onClose={() => setTermsOpen(false)} />}
      {privacyOpen && (
        <PrivacyPolicyModal onClose={() => setPravacyOpen(false)} />
      )}
      {projectOpen && <ProjectModal onClose={() => setProjectOpen(false)} />}
    </footer>
  );
};

export default MainFooter;
