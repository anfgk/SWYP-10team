import { fetchWithAuth } from "./fetchUtils";

const formatDateToString = (date: Date) => {
  const formatted = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return formatted;
};

const heartClickedWithLogin = (
  placeid: string,
  checked: boolean,
  setChecked: React.Dispatch<React.SetStateAction<boolean>>,
  likeChecked: boolean,
  setLikedAmount: React.Dispatch<React.SetStateAction<number>>
) => {
  //api 요청 부분(장소 좋아요)
  const fetchPlaceLike = async () => {
    try {
      const res = await fetchWithAuth(
        `/api/content/wish-check?contentId=${placeid}`,
        { method: "POST" }
      );

      if (res.status === 200) {
        if (likeChecked) {
          setLikedAmount((prev) => prev - 1);
        } else {
          setLikedAmount((prev) => prev + 1);
        }
        setChecked(!checked);
      }
    } catch (e) {
      console.log("장소 찜 실패: ", e);
    }
  };
  fetchPlaceLike();
};

const emptyStringToDefault = (str: string): string => {
  if (str === "") {
    return "추후 업데이트 예정입니다.";
  } else {
    return str;
  }
};

export { formatDateToString, heartClickedWithLogin, emptyStringToDefault };
