type Props = {
  value: number;
};

const AiRecCard = ({ value }: Props) => {
  return (
    <div className="bg-[var(--card-bg)] h-[342.55px]">
      <p className="text-5xl">{value}</p>
    </div>
  );
};

export default AiRecCard;
