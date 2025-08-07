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
  setChecked: (value: boolean) => void,
  likeChecked: boolean,
  setLikedAmount: React.Dispatch<React.SetStateAction<number>>
) => {
  if (likeChecked) {
    setLikedAmount((prev) => prev - 1);
  } else {
    setLikedAmount((prev) => prev + 1);
  }
  setChecked(!checked);
  //api 요청 부분(장소 좋아요)
  const endPoint = `/api/heart/XXX/${placeid}`;
  const method = !checked ? "POST" : "DELETE";
  alert(endPoint + " / " + method);
};

const emptyStringToDefault = (str: string): string => {
  if (str === "") {
    return "추후 업데이트 예정입니다.";
  } else {
    return str;
  }
};

export { formatDateToString, heartClickedWithLogin, emptyStringToDefault };
