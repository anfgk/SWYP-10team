interface Props {
  name: string;
  isActive: boolean;
  onToggle: () => void;
}

const SearchSortButton = ({ name, isActive, onToggle }: Props) => {
  return (
    <button
      className={`w-[94px] h-[38px] rounded-[48px] flex justify-center items-center border-[1px] border-[var(--main-color)] cursor-pointer  ${isActive ? "bg-[var(--main-color)] text-[var(--main-text)]" : "text-[var(--main-color)]"}`}
      onClick={onToggle}
    >
      {name}
    </button>
  );
};

export default SearchSortButton;
