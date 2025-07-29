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

export type { JWTPayLoad, ReviewData };
