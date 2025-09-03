import type { FieldDef, TabFields, TabKey } from "@/types/forFrontTypes";

export const labels: Record<TabKey, string> = {
  basic: "기본 정보",
  guide: "이용 안내",
  detail: "상세 정보",
  companion: "반려동물 동반 정보",
};

export const tabsByContentType: Record<number, Partial<TabFields>> = {
  // 관광지
  12: {
    basic: [
      { label: "명칭", key: "title" },
      { label: "주소", key: "addr1" },
      { label: "전화번호", key: "tel" },
    ],
    guide: [
      { label: "이용 시기", key: "useTime" },
      { label: "이용 시간", key: "restDate" },
      { label: "쉬는 날", key: "usetimeFee" },
      { label: "입장료", key: "usetimeFee" },
      { label: "주차 시설", key: "usetimeFee" },
      { label: "체험가능 연령", key: "usetimeFee" },
    ],
    detail: [
      { label: "체험 안내", key: "" },
      { label: "위치 정보", key: "" },
      { label: "주요 볼거리", key: "" },
    ],
  },

  // 행사/공연/축제
  15: {
    basic: [
      { label: "행사명", key: "title" },
      { label: "행사 장소", key: "eventPlace" },
      { label: "시작일", key: "eventPeriod" },
      { label: "종료일", key: "" },
      { label: "예매처", key: "bookingUrl" },
      { label: "주최/주관", key: "" },
      { label: "행사 홈페이지", key: "" },
    ],
    guide: [
      { label: "이용요금", key: "useTime" },
      { label: "관람가능연령", key: "usetimeFee" },
      { label: "신청 방법", key: "tel" },
      { label: "공연시간", key: "" },
      { label: "관람 소요시간", key: "" },
    ],
    detail: [
      { label: "행사 프로그램", key: "" },
      { label: "부대 행사", key: "" },
    ],
  },

  // 숙박
  32: {
    basic: [
      { label: "숙소명", key: "title" },
      { label: "주소", key: "addr1" },
      { label: "전화번호", key: "tel" },
      { label: "예약 홈페이지", key: "" },
      { label: "문의 및 안내", key: "" },
    ],
    guide: [
      { label: "체크인", key: "checkInTime" },
      { label: "체크아웃", key: "checkOutTime" },
      { label: "주차시설", key: "parking" },
      { label: "예약 안내", key: "" },
    ],
    detail: [
      { label: "객실 내 취사", key: "roomInfo" },
      { label: "식음료장", key: "amenities" },
      { label: "픽업 서비스", key: "" },
      { label: "객실 유형", key: "" },
    ],
  },

  // 음식점
  39: {
    basic: [
      { label: "상호명", key: "title" },
      { label: "주소", key: "addr1" },
      { label: "전화번호", key: "tel" },
      { label: "문의 및 안내", key: "" },
    ],
    guide: [
      { label: "영업시간", key: "useTime" },
      { label: "쉬는 날", key: "restDate" },
      { label: "주차 시설", key: "signatureMenu" },
      { label: "예약 안내", key: "" },
      { label: "포장 가능", key: "" },
    ],
    detail: [
      { label: "대표 메뉴", key: "overview" },
      { label: "취급 메뉴", key: "seatCount" },
      { label: "좌석 수", key: "" },
      { label: "규모", key: "" },
      { label: "어린이 놀이방", key: "" },
    ],
  },
};

//반려동물은 공통
export const companionCommon: FieldDef[] = [
  { label: "동반 안내", key: "petGuide.allowedPetType" },
  { label: "동반 구역", key: "petGuide.withPet" },
  { label: "주의 사항", key: "petGuide.petPrep" },
  { label: "기타 정보", key: "petGuide.etcInfo" },
];
