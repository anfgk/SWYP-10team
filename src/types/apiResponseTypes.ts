type JWTPayLoad = {
  sub?: string;
  email: string;
  displayName: string;
  iat?: number;
  exp?: number;
};

type ReviewImage = {
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
  images: ReviewImage[];
};

type ReviewData = {
  reviews: Review[];
  reviewImages: ReviewImage[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
  hasNext: boolean;
  hasPrevious: boolean;
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

type ReasonCode = {
  reasonId: number;
  content: string;
};

export type {
  JWTPayLoad,
  Review,
  ReviewImage,
  ReviewData,
  SearchCardData,
  ReasonCode,
};
