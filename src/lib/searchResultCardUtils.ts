function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function getDistanceInKm(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  const R = 6371;
  const dX = toRad(x2 - x1); // long
  const dY = toRad(y2 - y1); // lat

  const a =
    Math.sin(dY / 2) ** 2 +
    Math.cos(toRad(y1)) * Math.cos(toRad(y2)) * Math.sin(dX / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 100) / 100 + "km";
}
