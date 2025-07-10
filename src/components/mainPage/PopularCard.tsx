import { Card } from "@/components/ui/card";

type Props = {
  value: number;
};

const PopularCard = ({ value }: Props) => {
  return (
    <Card className="w-[282px] h-[324.59px] bg-[var(--card-bg)]">
      <p className="text-3xl mx-auto my-auto ">{value}</p>
    </Card>
  );
};

export default PopularCard;
