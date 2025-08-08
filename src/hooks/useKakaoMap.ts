import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  title: string;
  lat: number;
  lng: number;
}
const useKakaoMap = ({ title, lat, lng }: Props) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any | null>(null);
  const clickHandlerRef = useRef<any | null>(null);

  useEffect(() => {
    const { kakao } = window;
    if (!kakao || !mapRef.current) return;

    kakao.maps.load(() => {
      // 이미 맵 인스턴스가 있으면 center와 마커만 업데이트
      if (mapInstance.current) {
        const center = new kakao.maps.LatLng(lat, lng);
        mapInstance.current.setCenter(center);

        if (clickHandlerRef.current) {
          kakao.maps.event.removeListener(
            mapInstance.current,
            "click",
            clickHandlerRef.current
          );
        }

        // 새 핸들러 정의 (항상 최신 값 캡쳐)
        const handler = () => {
          window.open(`https://map.kakao.com/link/to/${title},${lat},${lng}`);
        };
        kakao.maps.event.addListener(mapInstance.current, "click", handler);
        clickHandlerRef.current = handler;

        if (mapInstance.current.marker) {
          mapInstance.current.marker.setMap(null); // 기존 마커 제거
        }
        const imgSrc = "/assets/icons/location_marker.png";
        const imgSize = new kakao.maps.Size(48, 58);
        const imgOption = { offset: new kakao.maps.Point(24, 40) };
        const markerImg = new kakao.maps.MarkerImage(
          imgSrc,
          imgSize,
          imgOption
        );

        const markerPosition = new kakao.maps.LatLng(lat, lng);

        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImg,
        });

        marker.setMap(mapInstance.current);

        // const iwContent = `<div class="kakao-info">${title}</div>`;
        // const infoWindow = new kakao.maps.InfoWindow({
        //   position: markerPosition,
        //   content: iwContent,
        // });

        // infoWindow.open(mapInstance.current, marker);

        // 마커 ref로 저장
        mapInstance.current.marker = marker;
        return;
      }

      // 맵 인스턴스가 없으면 맵 새로 생성
      const options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
      };
      mapInstance.current = new kakao.maps.Map(mapRef.current, options);

      const handler = () => {
        window.open(`https://map.kakao.com/link/to/${title},${lat},${lng}`);
      };
      kakao.maps.event.addListener(mapInstance.current, "click", handler);
      clickHandlerRef.current = handler;

      // 마커 생성
      const imgSrc = "/assets/icons/location_marker.png";
      const imgSize = new kakao.maps.Size(48, 58);
      const imgOption = { offset: new kakao.maps.Point(24, 58) };
      const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOption);

      const markerPosition = new kakao.maps.LatLng(lat, lng);

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImg,
      });

      marker.setMap(mapInstance.current);
      mapInstance.current.marker = marker;
    });
  }, [title, lat, lng]);

  return { mapRef };
};
export { useKakaoMap };
