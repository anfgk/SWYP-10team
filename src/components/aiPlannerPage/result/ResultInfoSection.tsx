import { usePlannerSelectionStore } from "@/stores/plannerSelectionStore";

const ResultInfoSection = () => {
  const { region, schedule, mood } = usePlannerSelectionStore();
  return (
    <section className="w-[405px] h-[901px] flex flex-col gap-[44px] border-1 border-blue-900">
      <p className="text-xl">{region}</p>
      <p className="text-xl">{schedule}</p>
      <p className="text-xl">{mood}</p>
    </section>
  );
};

export default ResultInfoSection;
