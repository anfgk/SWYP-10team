import SVGIcons from "./SVGIcons";

interface Props {
  name: string;
  isActive: boolean;
  onToggle: () => void;
}

const SortButton = ({ name, isActive, onToggle }: Props) => {
  return (
    <button
      className={`w-[66px] h-[24px] flex items-center gap-[2px] items-cente cursor-pointer  ${isActive ? "text-[var(--main-color)]" : "text-[var(--deactivated-text)]"}`}
      onClick={onToggle}
    >
      <SVGIcons
        name="sortCheck"
        width={24}
        height={24}
        color={isActive ? "var(--main-color)" : "var(--unactivatied-text)"}
      />
      <p className="text-[14px]">{name}</p>
    </button>
  );
};

export default SortButton;
