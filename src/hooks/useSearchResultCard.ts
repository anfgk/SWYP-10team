import { useEffect, useState } from "react";

interface Props {
  isLoggedIn: boolean;
  isLiked: boolean;
}

const useSearchResultCard = ({ isLoggedIn, isLiked }: Props) => {
  const [liked, setLiked] = useState(isLoggedIn ? isLiked : false);

  useEffect(() => {
    setLiked(isLoggedIn ? isLiked : false);
  }, [isLoggedIn, isLiked]);

  return { liked, setLiked };
};
export { useSearchResultCard };
