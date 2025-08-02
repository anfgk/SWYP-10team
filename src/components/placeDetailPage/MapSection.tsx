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

const MapSection = ({ title, lat, lng }: Props) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any | null>(null);

  useEffect(() => {
    const { kakao } = window;

    if (!kakao || !mapRef.current || mapInstance.current) return;

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

      // const iwContent = `<div class="kakao-info">${title}</div>`;
      // const infoWindow = new kakao.maps.InfoWindow({
      //   position: markerPosition,
      //   content: iwContent,
      // });

      // infoWindow.open(mapInstance.current, marker);

      kakao.maps.event.addListener(mapInstance.current, "click", () => {
        window.open(`https://map.kakao.com/link/to/${title},${lat},${lng}`);
      });
    });
  }, [title, lat, lng]);

  return (
    <section className="w-full h-fit pb-[44px]">
      <div ref={mapRef} className="w-full h-[202px]"></div>
    </section>
  );
};

export default MapSection;
