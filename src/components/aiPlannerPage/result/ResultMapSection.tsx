import { useKakaoMapOnPlanner } from "@/hooks/useKaKaoMapOnPlanner";
import type { PlannerMapPlacesData } from "@/types/apiResponseTypes";

interface Props {
  places: PlannerMapPlacesData[];
}
const ResultMapSection = ({ places }: Props) => {
  const { mapRef } = useKakaoMapOnPlanner({ items: places });
  return (
    <section className="w-[678px] h-[901px]">
      <div className="w-full h-full" ref={mapRef}></div>
    </section>
  );
};

export default ResultMapSection;
