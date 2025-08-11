import { IoAdd } from "react-icons/io5";

interface Props {
  setIsOpen: (v: boolean) => void;
}
const MyPetAddCard = ({ setIsOpen }: Props) => {
  return (
    <div className="w-[816px] h-[308px] border-[1px] border-[var(--search-element-border)] rounded-[16px] px-[32px] py-[24px] flex flex-col gap-[24px] justify-center items-center">
      <button
        className="w-12 h-12 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <IoAdd className="w-12 h-12" />
      </button>
    </div>
  );
};
export default MyPetAddCard;
