import type { PlannerMapPlacesData } from "@/types/apiResponseTypes";
import type { Coord } from "@/types/forFrontTypes";
import { getDistanceInKm } from "./searchResultCardUtils";

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

const getRouteDistance = (items: PlannerMapPlacesData[]) => {
  if (!items.length) return 0;

  let total = 0;

  for (let i = 0; i < items.length - 1; i++) {
    total += getDistanceInKm(
      items[i].mapx,
      items[i].mapy,
      items[i + 1].mapx,
      items[i + 1].mapy
    );
  }

  return Math.round(total * 100) / 100;
};

export { getCenterPoint, getRouteDistance };
