import { useKakaoMapOnPlanner } from "@/hooks/useKaKaoMapOnPlanner";
import type { PlannerDayPlan } from "@/types/apiResponseTypes";

interface Props {
  places?: PlannerDayPlan;
}
const ResultMapDiv = ({ places }: Props) => {
  const { mapRef } = useKakaoMapOnPlanner({
    item: places,
  });
  return <div className="w-full h-full" ref={mapRef} />;
};

export default ResultMapDiv;
