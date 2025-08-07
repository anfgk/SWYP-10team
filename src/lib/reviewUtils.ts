const heartClickedWithLogin = (
  reviewid: number,
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

const createMaskedNickname = (name: string) => {
  const length = name.length;
  const maskLength = Math.floor(length / 2);

  return name.slice(0, length - maskLength) + "*".repeat(maskLength);
};

export { heartClickedWithLogin, createMaskedNickname };
