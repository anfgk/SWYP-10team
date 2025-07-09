import { Card } from "./ui/card";

type Props = {
  value: number;
};

export default function ThemeCard({ value }: Props) {
  return (
    <Card className="w-[192px] h-[192px] bg-[var(--card-bg)]">
      <p className="text-3xl mx-auto my-auto">{value}</p>
    </Card>
  );
}
