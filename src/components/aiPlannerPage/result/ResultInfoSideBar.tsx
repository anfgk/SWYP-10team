import { usePlannerSelectionStore } from "@/stores/plannerSelectionStore";
interface Props {
  onClose: () => void;
  setDay: (day: number) => void;
}
const ResultInfoSideBar = ({ onClose, setDay }: Props) => {
  const { region, schedule, mood } = usePlannerSelectionStore();
  return (
    <aside className="absolute inset-0 w-[405px] h-full flex flex-col gap-[44px] overflow-y-auto bg-white z-50">
      <p className="ml-auto mr-3 cursor-pointer text-[30px]" onClick={onClose}>
        X
      </p>
      <p className="text-xl">{region}</p>
      <p className="text-xl">{schedule}</p>
      <p className="text-xl">{mood}</p>
      <div className="w-full h-[50px] flex justify-between">
        <button onClick={() => setDay(1)} className="w-10 h-10 cursor-pointer">
          1
        </button>
        <button onClick={() => setDay(2)} className="w-10 h-10 cursor-pointer">
          2
        </button>
        <button onClick={() => setDay(3)} className="w-10 h-10 cursor-pointer">
          3
        </button>
        <button
          onClick={() => setDay(100)}
          className="w-10 h-10 cursor-pointer"
        >
          A
        </button>
      </div>
      <div className="text-xl border-3">스크롤</div>
      <div className="text-xl border-3">스크롤</div>
      <div className="text-xl border-3">스크롤</div>
      <div className="text-xl border-3">스크롤</div>
      <div className="text-xl border-3">스크롤</div>
      <div className="text-xl border-3">스크롤</div>
      <div className="text-xl border-3">스크롤</div>
      <div className="text-xl border-3">스크롤</div>
      <div className="text-xl border-3">스크롤</div>
      <div className="text-xl border-3">스크롤</div>
      <div className="text-xl border-3">스크롤</div>
      <div className="text-xl border-3">마지막지점</div>
    </aside>
  );
};

export default ResultInfoSideBar;
