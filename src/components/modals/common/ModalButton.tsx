interface Props {
  onClick: () => void;
  text: string;
  bgcolor: string;
  textcolor: string;
}
const ModalButton = ({ onClick, text, bgcolor, textcolor }: Props) => {
  return (
    <button
      className={`w-full h-[56px] cursor-pointer rounded-[12px] font-semibold text-[18px] text-[var(${textcolor})] bg-[var(${bgcolor})] flex justify-center items-center transition hover:brightness-95 active:brightness-92`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ModalButton;
