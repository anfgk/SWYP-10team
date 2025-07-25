import { insertOrDeleteFromArr } from "@/lib/searchUtils";

interface Props {
  subregions: string[];
  current: string[];
  onChange: (region: string[]) => void;
}

const SubRegionList = ({ subregions, current, onChange }: Props) => {
  const isAllActive = current.length === 0;
  return (
    <div className="w-full flex flex-wrap mt-[15px] gap-[18px]">
      <button
        key={"전체"}
        onClick={() => onChange([])}
        className={`w-[57px] h-[36px] border-[1px] text-[14px] border-[var(--main-color)] rounded-[40px] ${isAllActive ? "bg-[var(--main-color)] text-[var(--main-text)]" : "text-[var(--main-color)]"} cursor-pointer`}
      >
        전체
      </button>
      {subregions.map((subrigion) => (
        <button
          key={subrigion}
          onClick={() => {
            onChange(insertOrDeleteFromArr(current, subrigion));
          }}
          className={`w-[57px] h-[36px] border-[1px] text-[14px] border-[var(--main-color)] rounded-[40px] ${current.includes(subrigion) ? "bg-[var(--main-color)] text-[var(--main-text)]" : "text-[var(--main-color)]"} cursor-pointer`}
        >
          {subrigion}
        </button>
      ))}
    </div>
  );
};

export default SubRegionList;
