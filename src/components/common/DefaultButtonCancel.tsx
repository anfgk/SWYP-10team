interface Props {
  w: number;
  h: number;
  text: string;
  textSize: number;
  onClick: () => void;
}

const DefaultButtonCancel = ({ w, h, text, textSize, onClick }: Props) => {
  return (
    <button
      style={{ width: w, height: h, fontSize: textSize }}
      className={`rounded-[10px] bg-[var(--indicator-disabled)] text-[var(--card-subText)] font-semibold cursor-pointer flex justify-center items-center transition hover:brightness-85`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default DefaultButtonCancel;
