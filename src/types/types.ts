type JWTPayLoad = {
  sub?: string;
  email: string;
  displayName: string;
  iat?: number;
  exp?: number;
};

type ReviewData = {
  id: string;
  profileImg: string;
  name: string;
  date: Date;
  rating: number;
  content: string;
  heartCount: number;
  isLiked: boolean;
  thumbnail: string;
};

type SearchCardData = {
  id: string;
  title: string;
  address: string;
  closeDay: string;
  mapX: number;
  mapY: number;
  rating: number;
  tags: string[];
  img: string;
  isLiked: boolean;
  createdAt: Date;
  heartCount: number;
};

// 반려동물 정보 타입 (화면 표시용)
type PetInfo = {
  id: number;
  name: string;
  type: string;
  gender: string;
  birth: string;
  size: string;
  imageUrl: string;
};

// 반려동물 등록/수정용 타입 (API 전송용)
type PetFormData = {
  name: string;
  type: string;
  gender: string;
  birthYear: string;
  size: string;
  image?: string;
};

export type { JWTPayLoad, ReviewData, SearchCardData, PetInfo, PetFormData };
