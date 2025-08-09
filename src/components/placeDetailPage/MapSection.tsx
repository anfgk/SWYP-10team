import { useKakaoMap } from "@/hooks/useKakaoMap";

interface Props {
  title: string;
  lat: number;
  lng: number;
}

const MapSection = ({ title, lat, lng }: Props) => {
  const { mapRef } = useKakaoMap({ title, lat, lng });

  return (
    <section className="w-full h-fit pb-[44px]">
      <div ref={mapRef} className="w-full h-[202px]"></div>
    </section>
  );
};

export default MapSection;
