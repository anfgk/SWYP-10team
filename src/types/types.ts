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

export type { JWTPayLoad, ReviewData, SearchCardData };
