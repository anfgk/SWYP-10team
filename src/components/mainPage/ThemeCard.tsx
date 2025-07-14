import { Card } from "../ui/card";

interface Props {
  value: number;
}

const ThemeCard = ({ value }: Props) => {
  return (
    <Card className="w-[150px] h-[150px] bg-[var(--card-bg)]">
      <p className="text-3xl mx-auto my-auto ">{value}</p>
    </Card>
  );
};

export default ThemeCard;
