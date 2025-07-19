import StarSVG from "@/assets/icons/star.svg?react";
import VectorSVG from "@/assets/icons/vector.svg?react";
import type { IconOptions } from "@/configs/svgOptions";

const icons: Record<IconOptions, React.FC<React.SVGProps<SVGSVGElement>>> = {
  star: StarSVG,
  vector: VectorSVG,
};

type Props = {
  name: IconOptions;
  width: number;
  height: number;
};

export default function SVGIcons({ name, width, height }: Props) {
  const Icon = icons[name];

  return <Icon width={width} height={height} />;
}
