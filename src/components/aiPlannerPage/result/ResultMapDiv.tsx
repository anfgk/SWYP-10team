import { useKakaoMapOnPlanner } from "@/hooks/useKaKaoMapOnPlanner";
import type { PlannerMapPlacesData } from "@/types/apiResponseTypes";

interface Props {
  places: PlannerMapPlacesData[];
}
const ResultMapDiv = ({ places }: Props) => {
  const { mapRef } = useKakaoMapOnPlanner({ items: places });
  return <div className="w-full h-full" ref={mapRef} />;
};

export default ResultMapDiv;
