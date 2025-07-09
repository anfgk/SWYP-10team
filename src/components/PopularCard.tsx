import { Card } from "./ui/card";

type Props = {
  value: number;
};

export default function PopularCard({ value }: Props) {
  return (
    <Card className="w-[360px] h-[415.47px] bg-[var(--card-bg)]">
      <p className="text-3xl mx-auto my-auto ">{value}</p>
    </Card>
  );
}
