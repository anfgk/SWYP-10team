import { getCenterPoint } from "@/lib/plannerUtils";
import type { PlannerMapPlacesData } from "@/types/apiResponseTypes";
import { useEffect, useMemo, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  items: PlannerMapPlacesData[];
  level?: number; // 초기 줌 레벨(기본 3)
}
const useKakaoMapOnPlanner = ({ items, level = 3 }: Props) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any | null>(null);

  const coords = useMemo(
    () =>
      items
        .filter(
          (it) => typeof it.mapx === "number" && typeof it.mapy === "number"
        )
        .map((it) => ({ mapX: it.mapx, mapY: it.mapy })),
    [items]
  );

  const mapCenter = useMemo(() => getCenterPoint(coords), [coords]);

  useEffect(() => {
    const { kakao } = window;
    if (!kakao || !mapRef.current) return;

    kakao.maps.load(() => {
      console.log(mapCenter);
      // 이미 맵 인스턴스가 있으면 center와 마커만 업데이트
      if (mapInstance.current) {
        const center = new kakao.maps.LatLng(mapCenter?.mapY, mapCenter?.mapX);
        mapInstance.current.setCenter(center);

        if (mapInstance.current.marker) {
          mapInstance.current.marker.setMap(null); // 기존 마커 제거
        }

        items.forEach((item) => {
          const imgSrc = `/assets/icons/markers/marker${item.day}_${item.index + 1}.png`;
          const imgSize = new kakao.maps.Size(32, 43);
          const imgOption = { offset: new kakao.maps.Point(16, 43) };
          const markerImg = new kakao.maps.MarkerImage(
            imgSrc,
            imgSize,
            imgOption
          );

          const markerPosition = new kakao.maps.LatLng(item.mapy, item.mapx);

          const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImg,
          });

          marker.setMap(mapInstance.current);
        });

        return;
      }

      // 맵 인스턴스가 없으면 맵 새로 생성
      const options = {
        center: new kakao.maps.LatLng(mapCenter?.mapY, mapCenter?.mapX),
        level: 9,
      };

      mapInstance.current = new kakao.maps.Map(mapRef.current, options);

      // 마커 생성
      items.forEach((item) => {
        const imgSrc = `/assets/icons/markers/marker${item.day}_${item.index + 1}.png`;
        const imgSize = new kakao.maps.Size(32, 43);
        const imgOption = { offset: new kakao.maps.Point(16, 43) };
        const markerImg = new kakao.maps.MarkerImage(
          imgSrc,
          imgSize,
          imgOption
        );

        const markerPosition = new kakao.maps.LatLng(item.mapy, item.mapx);

        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImg,
        });

        marker.setMap(mapInstance.current);
      });
    });
  }, [items]);

  return { mapRef };
};
export { useKakaoMapOnPlanner };
