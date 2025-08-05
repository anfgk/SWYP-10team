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

type ReviewData = {
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
  images: ReviewImage[];
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

export type { JWTPayLoad, ReviewData, SearchCardData };
