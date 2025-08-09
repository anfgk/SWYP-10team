import { useState, useEffect } from "react";

interface Props {
  likedCount: number;
  isLiked: boolean;
  placeId: string;
  isLoggedIn: boolean;
}

const usePlacePopularity = ({
  likedCount,
  isLiked,
  placeId,
  isLoggedIn,
}: Props) => {
  const [likedAmount, setLikedAmount] = useState(likedCount);
  const [likeChecked, setLikeChecked] = useState(isLoggedIn ? isLiked : false);

  useEffect(() => {
    setLikeChecked(isLoggedIn ? isLiked : false);
    setLikedAmount(likedCount);
  }, [isLoggedIn, isLiked, likedCount, placeId]);

  return { likeChecked, likedAmount, setLikeChecked, setLikedAmount };
};

export { usePlacePopularity };
