import PopularCard from "./PopularCard";

interface Props {
  items: number[];
}
const PopularSlide = ({ items }: Props) => {
  return (
    <div className="w-[1200px] h-full flex justify-between flex-shrink-0">
      {items.map((item) => (
        <PopularCard key={item} rank={item} />
      ))}
    </div>
  );
};

export default PopularSlide;
