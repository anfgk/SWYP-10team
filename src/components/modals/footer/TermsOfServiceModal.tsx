import { useModalEscapeKey } from "@/hooks/useModalEscapeKey";
import DefaultButtonConfirm from "@/components/common/DefaultButtonConfirm";
import ModalBackground from "../common/ModalBackground";

interface TermsOfServiceModalProps {
  onClose: () => void;
}

const TermsOfServiceModal = ({ onClose }: TermsOfServiceModalProps) => {
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
          어디가냥? 같이가개! 이용약관
        </h2>

        <div className="space-y-6 text-sm text-gray-700">
          <div className="mb-6">
            <p className="mb-4">
              본 약관은 SWYP 웹기획 10팀이 제공하는 반려동물 동반 공간 정보 제공
              서비스 &apos;어디가냥? 같이가개!&apos;(이하 &apos;서비스&apos;)의
              이용과 관련하여, 회사와 이용자 간 권리, 의무 및 책임사항, 기타
              필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </div>

          {/* 제1조 */}
          <div>
            <h3 className="font-bold mb-2">제1조 (목적)</h3>
            <p className="mb-2">
              이 약관은 서비스 제공자인 SWYP 웹기획 10팀(이하
              &apos;회사&apos;)이 제공하는 반려동물 동반 장소 검색 및 추천
              서비스와 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을
              규정함을 목적으로 합니다.
            </p>
          </div>

          {/* 제2조 */}
          <div>
            <h3 className="font-bold mb-2">제2조 (용어의 정의)</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                &apos;서비스&apos;란 회사가 제공하는 반려동물과 함께 방문할 수
                있는 장소에 대한 정보 검색, 리뷰, 추천 등의 기능을 의미합니다.
              </li>
              <li>
                &apos;이용자&apos;란 본 약관에 따라 회사가 제공하는 서비스를
                이용하는 자를 말합니다.
              </li>
              <li>
                &apos;회원&apos;이란 소셜 로그인을 통해 서비스를 이용하는
                자로서, 회사가 정한 절차에 따라 개인정보를 제공하고 본 약관에
                동의하여 가입한 자를 의미합니다.
              </li>
              <li>
                &apos;게시물&apos;이란 이용자가 서비스를 통해 작성한 글, 리뷰,
                이미지 등을 의미합니다.
              </li>
            </ul>
          </div>

          {/* 제3조 */}
          <div>
            <h3 className="font-bold mb-2">제3조 (약관의 게시 및 개정)</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                회사는 본 약관의 내용을 이용자가 알 수 있도록 서비스 초기화면
                또는 별도의 연결화면에 게시합니다.
              </li>
              <li>
                회사는 관련 법령에 위배되지 않는 범위에서 이 약관을 개정할 수
                있습니다. 개정 시 적용일자 및 개정사유를 명시하여 사전에
                공지합니다.
              </li>
            </ul>
          </div>

          {/* 제4조 */}
          <div>
            <h3 className="font-bold mb-2">제4조 (이용계약의 성립)</h3>
            <p className="mb-2">
              서비스 이용계약은 이용자가 본 약관의 내용에 동의하고, 회사가 정한
              방식으로 소셜 로그인을 완료함으로써 성립됩니다.
            </p>
          </div>

          {/* 제5조 */}
          <div>
            <h3 className="font-bold mb-2">제5조 (서비스의 제공 및 변경)</h3>
            <p className="mb-2">회사는 다음과 같은 서비스를 제공합니다:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                반려동물 동반 가능 장소 검색, 지역 필터, 거리순/인기순/최신순
                정렬
              </li>
              <li>장소 상세 정보 제공 및 리뷰 열람</li>
              <li>리뷰 작성 및 수정 기능</li>
              <li>찜한 장소, 방문 이력, 최근 본 장소 조회</li>
              <li>
                반려동물 정보 입력 및 개인화 추천 (AI 기반 추천 기능 포함)
              </li>
            </ul>
            <p className="mt-2">
              회사는 서비스 운영상 필요에 따라 서비스의 내용을 변경할 수 있으며,
              변경 내용은 사전 공지합니다.
            </p>
          </div>

          {/* 제6조 */}
          <div>
            <h3 className="font-bold mb-2">제6조 (서비스의 중단)</h3>
            <p className="mb-2">
              회사는 시스템 점검, 교체, 고장 또는 운영상 필요한 경우 서비스의
              제공을 일시 중단할 수 있습니다. 이 경우 사전 공지하되, 부득이한
              경우 사후에 통지할 수 있습니다.
            </p>
          </div>

          {/* 제7조 */}
          <div>
            <h3 className="font-bold mb-2">제7조 (회원 탈퇴 및 이용 제한)</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                이용자는 언제든지 소셜 로그인 계정을 연동 해제하거나 서비스
                탈퇴를 요청할 수 있습니다.
              </li>
              <li>
                회사는 다음 사유가 발생할 경우 서비스 이용을 제한하거나 탈퇴
                처리할 수 있습니다:
              </li>
              <ul className="list-disc list-inside space-y-1 ml-8 mt-1">
                <li>타인의 개인정보 도용</li>
                <li>욕설, 혐오, 음란 등 부적절한 콘텐츠 작성</li>
                <li>시스템을 해킹하거나 정상적인 운영을 방해하는 경우</li>
              </ul>
            </ul>
          </div>

          {/* 제8조 */}
          <div>
            <h3 className="font-bold mb-2">제8조 (게시물 관리)</h3>
            <p className="mb-2">
              이용자가 작성한 게시물은 해당 이용자에게 책임이 있으며, 회사는
              다음과 같은 경우 사전 통지 없이 삭제할 수 있습니다:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>법령을 위반하거나 타인의 권리를 침해하는 경우</li>
              <li>공공질서 및 미풍양속을 해치는 경우</li>
              <li>허위 정보 또는 광고성 내용을 포함하는 경우</li>
            </ul>
            <p className="mt-2">
              이용자는 신고 기능을 통해 부적절한 게시물을 회사에 알릴 수
              있습니다.
            </p>
          </div>

          {/* 제9조 */}
          <div>
            <h3 className="font-bold mb-2">제9조 (지적재산권)</h3>
            <p className="mb-2">
              서비스 내 제공되는 모든 콘텐츠에 대한 지적재산권은 회사 또는
              제휴사에 귀속되며, 이용자는 이를 무단으로 복제, 배포할 수
              없습니다.
            </p>
          </div>

          {/* 제10조 */}
          <div>
            <h3 className="font-bold mb-2">제10조 (면책조항)</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                회사는 단순 정보 제공 서비스로서, 이용자가 등록한 정보의 진위
                또는 정확성에 대해 책임지지 않습니다.
              </li>
              <li>
                회사는 천재지변, 기술적 장애, 제3자의 불법행위로 인한 손해에
                대해 책임지지 않습니다.
              </li>
            </ul>
          </div>

          {/* 제11조 */}
          <div>
            <h3 className="font-bold mb-2">제11조 (고객지원)</h3>
            <p className="mb-2">
              서비스 관련 문의는 아래 이메일을 통해 접수받습니다.
            </p>
            <p className="font-medium">📧 jeongmin2732@gmail.com</p>
          </div>

          {/* 부칙 */}
          <div className="mt-8 pt-4 border-t border-gray-300">
            <h3 className="font-bold mb-2">부칙</h3>
            <p>본 약관은 2025년 8월 10일부터 시행됩니다.</p>
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

export default TermsOfServiceModal;
