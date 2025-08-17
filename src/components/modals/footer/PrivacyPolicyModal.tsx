import { useModalEscapeKey } from "@/hooks/useModalEscapeKey";
import DefaultButtonConfirm from "@/components/common/DefaultButtonConfirm";
import ModalBackground from "../common/ModalBackground";

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

const PrivacyPolicyModal = ({ onClose }: PrivacyPolicyModalProps) => {
  useModalEscapeKey(onClose);
  return (
    <ModalBackground onClose={onClose}>
      <div
        className="bg-white rounded-lg p-8 w-[448px] h-[700px] overflow-y-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[18px] font-bold mb-6 text-gray-800">
          어디가냥? 같이가개! 개인정보처리방침
        </h2>

        <div className="space-y-6 text-sm text-gray-700">
          {/* 제1조 */}
          <div>
            <h3 className="font-bold mb-2">
              제1조 (개인정보의 수집 항목 및 방법)
            </h3>
            <p className="mb-2">
              회사는 소셜 로그인 방식을 통해 다음의 개인정보를 수집합니다.
            </p>
            <p className="font-bold mb-2">필수 수집 항목:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>소셜 로그인 ID</li>
              <li>닉네임</li>
              <li>프로필 이미지</li>
              <li>반려동물 이미지 및 정보</li>
            </ul>
          </div>

          {/* 제2조 */}
          <div>
            <h3 className="font-bold mb-2">
              제2조 (개인정보의 수집 및 이용 목적)
            </h3>
            <p className="mb-2">
              회사는 수집된 개인정보를 다음의 목적에만 사용합니다.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>사용자 인증 및 로그인 유지</li>
              <li>사용자 맞춤 콘텐츠 제공 (추천 장소 등)</li>
              <li>리뷰 작성 시 사용자 정보 표시</li>
            </ul>
          </div>

          {/* 제3조 */}
          <div>
            <h3 className="font-bold mb-2">
              제3조 (개인정보의 보유 및 이용기간)
            </h3>
            <p className="mb-2">
              회사는 개인정보 수집 및 이용 목적이 달성된 후 즉시 파기합니다.
            </p>
            <p className="text-sm">
              단, 관련 법령에 따라 보존이 필요한 경우 해당 법령에 따라
              보관합니다.
            </p>
          </div>

          {/* 제4조 */}
          <div>
            <h3 className="font-bold mb-2">제4조 (개인정보의 제3자 제공)</h3>
            <p>
              회사는 이용자의 개인정보를 외부에 제공하지 않으며, 향후 제공이
              필요한 경우에는 사전 동의를 받습니다.
            </p>
          </div>

          {/* 제5조 */}
          <div>
            <h3 className="font-bold mb-2">
              제5조 (개인정보의 파기절차 및 방법)
            </h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                파기절차: 목적 달성 후 즉시 삭제되며, 복구되지 않도록 안전하게
                처리합니다.
              </li>
              <li>
                파기방법: 전자적 파일은 복구 불가능한 기술적 방법으로
                파기합니다.
              </li>
            </ul>
          </div>

          {/* 제6조 */}
          <div>
            <h3 className="font-bold mb-2">
              제6조 (개인정보의 보호를 위한 기술적/관리적 대책)
            </h3>
            <p className="mb-2">
              회사는 개인정보 보호를 위하여 다음과 같은 조치를 취하고 있습니다.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>접근 제한 및 권한 관리</li>
              <li>정기적 백신 프로그램 운용</li>
              <li>개인정보 처리 직원의 최소화 및 교육 실시</li>
            </ul>
          </div>

          {/* 제7조 */}
          <div>
            <h3 className="font-bold mb-2">제7조 (개인정보 보호책임자)</h3>
            <p className="mb-1">책임자: SWYP 웹기획 10팀</p>
            <p>이메일: jeongmin2732@gmail.com</p>
          </div>

          {/* 제8조 */}
          <div>
            <h3 className="font-bold mb-2">제8조 (권익침해 구제 방법)</h3>
            <p className="mb-2">
              개인정보 침해에 대한 신고나 상담이 필요한 경우 아래 기관에
              문의하실 수 있습니다.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>개인정보침해신고센터: privacy.kisa.or.kr / 118</li>
              <li>대검찰청 사이버수사과: www.spo.go.kr / 1301</li>
              <li>경찰청 사이버안전국: cyberbureau.police.go.kr / 182</li>
            </ul>
          </div>
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
    </ModalBackground>
  );
};

export default PrivacyPolicyModal;
