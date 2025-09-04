import type { FieldDef, TabFields, TabKey } from "@/types/forFrontTypes";

export const labels: Record<TabKey, string> = {
  basic: "기본 정보",
  guide: "이용 안내",
  detail: "상세 정보",
  companion: "반려동물 동반 정보",
};

//반려동물은 공통
export const companionCommon: FieldDef[] = [
  { label: "동반 안내", key: "petGuide.allowedPetType" },
  { label: "동반 구역", key: "petGuide.withPet" },
  { label: "주의 사항", key: "petGuide.petPrep" },
  { label: "기타 정보", key: "petGuide.etcInfo" },
];

export const tabsByContentType: Record<number, Partial<TabFields>> = {
  // 관광지
  12: {
    basic: [
      { label: "명칭", key: "title" },
      {
        label: "주소",
        render: (place) => `${place.addr1} ${place.addr2 ?? ""}`,
      },
      { label: "전화번호", key: "tel" },
    ],
    guide: [
      { label: "이용 시기", key: "additionalInformation.use_season" },
      { label: "이용 시간", key: "additionalInformation.use_time" },
      { label: "쉬는 날", key: "restDate" },
      { label: "주차 시설", key: "additionalInformation.parking" },
      { label: "체험가능 연령", key: "additionalInformation.exp_age_range" },
      { label: "문의 및 안내", key: "additionalInformation.info_center" },
    ],
    detail: [{ label: "체험 안내", key: "additionalInformation.exp_guide" }],
    companion: companionCommon,
  },

  // 행사/공연/축제
  15: {
    basic: [
      { label: "행사명", key: "title" },
      {
        label: "주소",
        render: (place) => `${place.addr1} ${place.addr2 ?? ""}`,
      },
      { label: "홈페이지", key: "additionalInformation.eventHompage" },
    ],
    guide: [
      { label: "행사 장소", key: "additionalInformation.eventPlace" },
      { label: "시작일", key: "additionalInformation.eventStartDate" },
      { label: "종료일", key: "additionalInformation.eventEndDate" },
      { label: "예매처", key: "additionalInformation.bookingPlace" },
      { label: "주최", key: "additionalInformation.organizer" },
      { label: "주관", key: "additionalInformation.supervisor" },
      { label: "이용요금", key: "additionalInformation.fee_info" },
      { label: "관람가능연령", key: "additionalInformation.ageLimit" },
      { label: "공연시간", key: "additionalInformation.playTime" },
      {
        label: "관람 소요시간",
        key: "additionalInformation.spend_time_festival",
      },
    ],
    detail: [
      { label: "행사 프로그램", key: "additionalInformation.program" },
      { label: "부대 행사", key: "additionalInformation.subEvent" },
    ],
    companion: companionCommon,
  },

  // 숙박
  32: {
    basic: [
      { label: "숙소명", key: "title" },
      {
        label: "주소",
        render: (place) => `${place.addr1} ${place.addr2 ?? ""}`,
      },
      { label: "전화번호", key: "tel" },
      { label: "예약 홈페이지", key: "additionalInformation.reservationUrl" },
      { label: "문의 및 안내", key: "additionalInformation.information" },
    ],
    guide: [
      { label: "체크인", key: "additionalInformation.checkInTime" },
      { label: "체크아웃", key: "additionalInformation.checkOutTime" },
      { label: "주차시설", key: "additionalInformation.parking" },
      { label: "예약 안내", key: "additionalInformation.reservationInfo" },
    ],
    detail: [
      { label: "객실 내 취사", key: "additionalInformation.cooking" },
      { label: "식음료장", key: "additionalInformation.foodplace" },
      { label: "픽업 서비스", key: "additionalInformation.pickupService" },
      { label: "객실 유형", key: "additionalInformation.roomType" },
      { label: "환불 규정", key: "additionalInformation.refundRegulation" },
    ],
    companion: companionCommon,
  },

  // 음식점
  39: {
    basic: [
      { label: "상호명", key: "title" },
      {
        label: "주소",
        render: (place) => `${place.addr1} ${place.addr2 ?? ""}`,
      },
      { label: "전화번호", key: "tel" },
      { label: "문의 및 안내", key: "additionalInformation.information" },
    ],
    guide: [
      { label: "영업시간", key: "additionalInformation.openTime" },
      { label: "쉬는 날", key: "additionalInformation.restDate" },
      { label: "주차 시설", key: "additionalInformation.parking" },
      { label: "예약 안내", key: "additionalInformation.reservation" },
      { label: "포장 가능", key: "additionalInformation.takeout" },
    ],
    detail: [
      { label: "대표 메뉴", key: "additionalInformation.signatureMenu" },
      { label: "취급 메뉴", key: "additionalInformation.treatMenu" },
      { label: "좌석 수", key: "additionalInformation.seat" },
      { label: "어린이 놀이방", key: "additionalInformation.kidsFacility" },
    ],
    companion: companionCommon,
  },
};
