interface Props {
  w: number;
  value: string;
  isActive: boolean;
  onClick: () => void;
}

const OptionSelectButton = ({ w, value, isActive, onClick }: Props) => {
  return (
    <button
      style={{ width: w }}
      className={`flex justify-center items-center h-[38px] rounded-[48px] border-[1px] border-[var(--main-color)] text-[16px] ${isActive ? "bg-[var(--main-color)] text-[var(--main-text)]" : "text-[var(--main-color)]"} cursor-pointer`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default OptionSelectButton;
