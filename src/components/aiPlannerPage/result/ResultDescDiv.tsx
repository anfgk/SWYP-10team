interface Props {
  type: string;
  value: string;
}

const ResultDescDiv = ({ type, value }: Props) => {
  return (
    <div className="w-fit h-[22px] flex gap-[57px] items-center">
      <p className="w-[100px] h-full flex items-center text-[16px]">{type}</p>
      <p className="w-fit h-full flex items-center text-[16px]">{value}</p>
    </div>
  );
};

export default ResultDescDiv;
