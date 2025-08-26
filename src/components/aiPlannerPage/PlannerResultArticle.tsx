import { usePlannerSelectionStore } from "@/stores/plannerSelectionStore";

const PlannerResultArticle = () => {
  const { region, schedule, mood } = usePlannerSelectionStore();
  return (
    <article className="py-[96px] flex flex-col gap-[70px] w-full h-[1183px]">
      <h1 className="text-[50px] font-bold">{region}</h1>
      <h1 className="text-[50px] font-bold">{schedule}</h1>
      <h1 className="text-[50px] font-bold">{mood}</h1>
    </article>
  );
};

export default PlannerResultArticle;
