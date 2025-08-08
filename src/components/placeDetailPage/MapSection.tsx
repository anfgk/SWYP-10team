import { useEffect, useRef } from "react";

interface Props {
  title: string;
  lat: number;
  lng: number;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const MapSection = ({ title, lat, lng }: Props) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any | null>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      const { kakao } = window;

      if (!kakao || !mapRef.current || mapInstance.current) return;

      try {
        kakao.maps.load(() => {
          const options = {
            center: new kakao.maps.LatLng(lat, lng),
            level: 3,
          };

          mapInstance.current = new kakao.maps.Map(mapRef.current, options);

          const markerPosition = new kakao.maps.LatLng(lat, lng);

          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(mapInstance.current);

          kakao.maps.event.addListener(mapInstance.current, "click", () => {
            window.open(`https://map.kakao.com/link/to/${title},${lat},${lng}`);
          });
        });
      } catch (error) {
        console.error("Kakao Map 로딩 실패:", error);
      }
    };

    // SDK가 로드될 때까지 대기
    const checkKakaoSDK = () => {
      if (window.kakao) {
        loadKakaoMap();
      } else {
        // SDK가 아직 로드되지 않았으면 잠시 후 다시 시도
        setTimeout(checkKakaoSDK, 100);
      }
    };

    checkKakaoSDK();

    return () => {
      if (mapInstance.current) {
        mapInstance.current = null;
      }
    };
  }, [title, lat, lng]);

  return <div ref={mapRef} className="w-full h-[202px] mb-5"></div>;
};

export default MapSection;
