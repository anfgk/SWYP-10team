interface Props {
  w: number;
  h: number;
  text: string;
  textSize: number;
  onClick: () => void;
  isActive?: boolean;
}

const DefaultButtonConfirm = ({
  w,
  h,
  text,
  textSize,
  onClick,
  isActive = true,
}: Props) => {
  return (
    <button
      style={{ width: w, height: h, fontSize: textSize }}
      className={`rounded-[10px] bg-[var(--main-color)] text-[var(--main-text)] font-semibold flex justify-center items-center ${
        !isActive
          ? "cursor-not-allowed"
          : "cursor-pointer transition hover:brightness-85"
      }`}
      onClick={onClick}
      disabled={!isActive}
    >
      {text}
    </button>
  );
};

export default DefaultButtonConfirm;
