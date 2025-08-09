import { insertOrDeleteFromArr } from "@/lib/searchUtils";

interface Props {
  subregions: string[];
  current: string[];
  onChange: (region: string[]) => void;
}

const SubRegionList = ({ subregions, current, onChange }: Props) => {
  const isAllActive = current.length === 0;
  return (
    <div className="w-full flex flex-wrap mt-[15px] gap-[15px]">
      <button
        key={"전체"}
        onClick={() => onChange([])}
        className={`w-[76px] h-[38px] border-[1px] text-[16px] border-[var(--main-color)] rounded-[40px] ${isAllActive ? "bg-[var(--main-color)] text-[var(--main-text)]" : "text-[var(--main-color)]"} cursor-pointer`}
      >
        전체
      </button>
      {subregions.map((subregion) => (
        <button
          key={subregion}
          onClick={() => {
            onChange(insertOrDeleteFromArr(current, subregion));
          }}
          className={`w-[76px] h-[38px] border-[1px] text-[16px] border-[var(--main-color)] rounded-[40px] ${current.includes(subregion) ? "bg-[var(--main-color)] text-[var(--main-text)]" : "text-[var(--main-color)]"} cursor-pointer`}
        >
          {subregion}
        </button>
      ))}
    </div>
  );
};

export default SubRegionList;
