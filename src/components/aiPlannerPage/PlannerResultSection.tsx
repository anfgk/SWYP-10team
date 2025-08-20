import { usePlannerSelectionStore } from "@/stores/plannerSelectionStore";

const PlannerResultSection = () => {
  const { region, schedule, mood } = usePlannerSelectionStore();
  return (
    <section className="py-[68px] mx-auto flex flex-col gap-[70px] w-full h-[1312px] ">
      <h1 className="text-[50px] font-bold">{region}</h1>
      <h1 className="text-[50px] font-bold">{schedule}</h1>
      <h1 className="text-[50px] font-bold">{mood}</h1>
    </section>
  );
};

export default PlannerResultSection;
