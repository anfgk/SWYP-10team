type JWTPayLoad = {
  sub?: string;
  email: string;
  displayName: string;
  iat?: number;
  exp?: number;
};

type ResponseImage = {
  imageId: number;
  imageUrl: string;
};

type Review = {
  contentId: number;
  reviewId: number;
  userId: number;
  displayName: string;
  profileImageUrl: string;
  content: string;
  score: number;
  createdAt: string; // ISO date string
  recommendedNumber: number;
  isRecommended: boolean;
  isBlind: boolean;
  images: ResponseImage[];
};

type ReviewData = {
  reviews: Review[];
  reviewImages: ResponseImage[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

type SearchCardData = {
  contentId: number;
  title: string;
  addr1: string;
  addr2: string;
  image: string;
  thumbImage: string;
  categoryId: string;
  contentTypeId: number;
  copyright: string;
  mapx: number;
  mapy: number;
  mlevel: number;
  tel: string;
  zipcode: number;
  avgScore: number;
  wishData: boolean;
  regionName: {
    sidoName: string;
    sigunguName: string;
  };
  hashtag: string[];
  restDate: string;
  totalView: number;
  wishCnt: number;
  createdAt: string;
};

type PopularCardData = {
  contentId: number;
  title: string;
  addr1?: string;
  addr2?: string;
  image: string;
  thumbImage?: string;
  categoryId: string;
  contentTypeId: number;
  copyright?: string;
  mapx: number;
  mapy: number;
  mlevel?: number;
  tel?: string;
  zipcode?: number;
  avgScore: number;
  wishData: boolean;
  regionName: {
    sidoName: string;
    sigunguName: string;
  };
  hashtag: string[];
  restDate: string;
  totalView?: number;
  wishCnt?: number;
  createdAt?: string;
  ranking: number;
};

type CardInputType = SearchCardData | PopularCardData;

type PlaceDetailData = {
  contentId: 0;
  title: string;
  addr1: string;
  addr2: string;
  image: string;
  thumbImage: string;
  categoryId: string;
  contentTypeId: number;
  copyright: string;
  mapx: number;
  mapy: number;
  mlevel: number;
  tel: string;
  zipcode: number;
  avgScore: number;
  wishData: true;
  wishCnt: number;
  totalView: number;
  overview: string;
  detailImage: ResponseImage[];
  petGuide: PetGuideData;
  restDate: string;
};

type AiRecommendData = {
  contentId: string;
  message: string;
  imageUrl: string;
};

type ReasonCode = {
  reasonId: number;
  content: string;
};

type PetGuideData = {
  allowedPetType: string;
  petPrep: string;
  withPet: string;
  etcInfo: string;
};

export type {
  JWTPayLoad,
  Review,
  ResponseImage,
  ReviewData,
  SearchCardData,
  PlaceDetailData,
  ReasonCode,
  PopularCardData,
  AiRecommendData,
  CardInputType,
  PetGuideData,
};
