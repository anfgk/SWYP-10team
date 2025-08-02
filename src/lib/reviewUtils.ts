const heartClickedWithLogin = (
  reviewid: string,
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
  const endPoint = `/api/heart/XXX/${reviewid}`;
  const method = !checked ? "POST" : "DELETE";
  alert(endPoint + " / " + method);
};

export { heartClickedWithLogin };
