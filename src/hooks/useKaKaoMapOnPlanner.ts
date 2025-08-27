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
}
const useKakaoMapOnPlanner = ({ items }: Props) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any | null>(null);
  const markersRef = useRef<any[]>([]);

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
    if (!kakao || !mapRef.current || !mapCenter) return;

    kakao.maps.load(() => {
      // 기존 마커 모두 제거
      const clearMarkers = () => {
        if (markersRef.current.length) {
          markersRef.current.forEach((m) => m.setMap(null));
          markersRef.current = [];
        }
      };

      // 마커 추가
      const addMarkers = () => {
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
            clickable: true,
          });

          marker.setMap(mapInstance.current);

          kakao.maps.event.addListener(marker, "click", () => {
            window.open(
              `/placedetail/${item.contentId}`,
              "_blank",
              "noopener,noreferrer"
            );
          });

          markersRef.current.push(marker);

          const iwContent = `<div class="k-iw">${item.title}</div>`;

          const overlay = new kakao.maps.CustomOverlay({
            content: iwContent,
            map: mapInstance.current,
            position: new kakao.maps.LatLng(item.mapy, item.mapx),
            yAnchor: 2.2,
          });

          overlay.setMap(mapInstance.current);
          overlay.setVisible(false);

          kakao.maps.event.addListener(marker, "mouseover", () => {
            overlay.setVisible(true);
          });

          kakao.maps.event.addListener(marker, "mouseout", () => {
            overlay.setVisible(false);
          });
        });
      };

      // 사이드바 만큼 중심점 밀기
      const setCenterWithOffset = (
        map: any,
        latLng: any,
        offsetX: number,
        offsetY: number
      ) => {
        const proj = map.getProjection();
        const pt = proj.containerPointFromCoords(latLng); // 좌표 > 픽셀
        const shifted = new kakao.maps.Point(pt.x - offsetX, pt.y - offsetY);
        const newCenter = proj.coordsFromContainerPoint(shifted); // 픽셀 > 좌표
        map.setCenter(newCenter);
      };

      // 이미 맵 인스턴스가 있으면 center와 마커만 업데이트
      if (mapInstance.current) {
        const center = new kakao.maps.LatLng(mapCenter?.mapY, mapCenter?.mapX);
        setCenterWithOffset(mapInstance.current, center, 200, 0);

        clearMarkers();
        addMarkers();
        return;
      }

      // 맵 인스턴스가 없으면 맵 새로 생성
      const options = {
        center: new kakao.maps.LatLng(mapCenter?.mapY, mapCenter?.mapX),
        level: 8,
      };

      mapInstance.current = new kakao.maps.Map(mapRef.current, options);

      // 줌 & 맵 타입 컨트롤러 생성 및 추가
      const mapTypeControl = new kakao.maps.MapTypeControl();
      const zoomControl = new kakao.maps.ZoomControl();

      mapInstance.current.addControl(
        mapTypeControl,
        kakao.maps.ControlPosition.TOPRIGHT
      );
      mapInstance.current.addControl(
        zoomControl,
        kakao.maps.ControlPosition.RIGHT
      );

      addMarkers();
    });
  }, [items]);

  return { mapRef };
};
export { useKakaoMapOnPlanner };
