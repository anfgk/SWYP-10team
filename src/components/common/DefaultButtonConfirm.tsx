interface Props {
  w: number;
  h: number;
  text: string;
  textSize: number;
  onClick: () => void;
}

const DefaultButtonConfirm = ({ w, h, text, textSize, onClick }: Props) => {
  return (
    <button
      style={{ width: w, height: h, fontSize: textSize }}
      className={`rounded-[10px] bg-[var(--main-color)] text-[var(--main-text)] font-semibold cursor-pointer flex justify-center items-center transition hover:brightness-85`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default DefaultButtonConfirm;
