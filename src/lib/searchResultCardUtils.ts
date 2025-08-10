import { fetchWithAuth } from "./fetchUtils";

const toRad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

const getDistanceInKm = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number => {
  const R = 6371;
  const dX = toRad(x2 - x1); // long
  const dY = toRad(y2 - y1); // lat

  const a =
    Math.sin(dY / 2) ** 2 +
    Math.cos(toRad(y1)) * Math.cos(toRad(y2)) * Math.sin(dX / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 100) / 100;
};

const heartClickedWithLogin = (
  placeid: string,
  checked: boolean,
  setChecked: (value: boolean) => void,
) => {
  setChecked(!checked);
  //api 요청 부분(장소 좋아요)
  const fetchPlaceLike = async () => {
    try {
      const res = await fetchWithAuth(
        `/api/content/wish-check?contentId=${placeid}`,
        { method: "POST" },
      );

      if (res.status === 200) {
        setChecked(!checked);
      }
    } catch (e) {
      console.log("장소 찜 실패: ", e);
    }
  };
  fetchPlaceLike();
};

export { getDistanceInKm, heartClickedWithLogin };
