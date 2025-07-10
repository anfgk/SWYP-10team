import { Card } from "../ui/card";

type Props = {
  value: number;
};

const ThemeCard = ({ value }: Props) => {
  return (
    <Card className="w-[150.83px] h-[150.83px] bg-[var(--card-bg)]">
      <p className="text-3xl mx-auto my-auto ">{value}</p>
    </Card>
  );
};

export default ThemeCard;
