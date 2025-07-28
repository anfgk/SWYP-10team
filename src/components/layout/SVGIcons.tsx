import StarSVG from "@/assets/icons/star.svg?react";
import VectorSVG from "@/assets/icons/vector.svg?react";
import ThumnailHeartSVG from "@/assets/icons/thumbnail_heart.svg?react";
import ThumnailShareSVG from "@/assets/icons/thumbnail_share.svg?react";
import type { IconOptions } from "@/configs/svgOptions";

const icons: Record<IconOptions, React.FC<React.SVGProps<SVGSVGElement>>> = {
  star: StarSVG,
  vector: VectorSVG,
  thumbnailShare: ThumnailShareSVG,
  thumbnailHeart: ThumnailHeartSVG,
};

type Props = {
  name: IconOptions;
  width: number;
  height: number;
  color: string;
};

export default function SVGIcons({ name, width, height, color }: Props) {
  const Icon = icons[name];

  return <Icon width={width} height={height} color={color} />;
}
