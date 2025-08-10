import { fetchWithAuth } from "./fetchUtils";
const heartClickedWithLogin = (
  reviewId: number,
  checked: boolean,
  setChecked: (value: boolean) => void,
  likeChecked: boolean,
  setLikedAmount: React.Dispatch<React.SetStateAction<number>>,
) => {
  //api 요청 부분(리뷰 좋아요)
  const fetchPlaceLike = async () => {
    const method = checked ? "DELETE" : "POST";
    try {
      const res = await fetchWithAuth(`/api/review/recommend/${reviewId}`, {
        method: method,
      });

      if (res.status === 200) {
        if (likeChecked) {
          setLikedAmount((prev) => prev - 1);
        } else {
          setLikedAmount((prev) => prev + 1);
        }
        setChecked(!checked);
      }
    } catch (e) {
      console.log("리뷰 좋아요 실패: ", e);
    }
  };
  fetchPlaceLike();
};

const createMaskedNickname = (name: string) => {
  const length = name.length;
  const maskLength = Math.floor(length / 2);

  return name.slice(0, length - maskLength) + "*".repeat(maskLength);
};

export { heartClickedWithLogin, createMaskedNickname };
