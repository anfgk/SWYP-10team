import type { Coord } from "@/types/forFrontTypes";
const getCenterPoint = (coords: Coord[]) => {
  if (coords.length === 0) return null;

  const sum = coords.reduce(
    (acc, cur) => {
      acc.x += cur.mapX;
      acc.y += cur.mapY;
      return acc;
    },
    { x: 0, y: 0 }
  );
  return {
    mapX: sum.x / coords.length,
    mapY: sum.y / coords.length,
  };
};

export { getCenterPoint };
