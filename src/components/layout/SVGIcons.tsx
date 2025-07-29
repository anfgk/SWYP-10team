import StarSVG from "@/assets/icons/star.svg?react";
import VectorSVG from "@/assets/icons/vector.svg?react";
import ThumbnailHeartSVG from "@/assets/icons/thumbnail_heart.svg?react";
import ThumbnailHeartClickedSVG from "@/assets/icons/thumbnail_heart_clicked.svg?react";
import ThumbnailShareSVG from "@/assets/icons/thumbnail_share.svg?react";
import PlacedetailHeartSVG from "@/assets/icons/placedetail_heart.svg?react";
import PlacedetailViewSVG from "@/assets/icons/placedetail_view.svg?react";
import PlacedetailShareSVG from "@/assets/icons/placedetail_share.svg?react";
import SortCheckSVG from "@/assets/icons/sort_check.svg?react";
import CheckDefaultSVG from "@/assets/icons/check_default.svg?react";
import CheckCheckedSVG from "@/assets/icons/check_checked.svg?react";
import type { IconOptions } from "@/configs/svgOptions";

const icons: Record<IconOptions, React.FC<React.SVGProps<SVGSVGElement>>> = {
  star: StarSVG,
  vector: VectorSVG,
  thumbnailShare: ThumbnailShareSVG,
  thumbnailHeart: ThumbnailHeartSVG,
  thumbnailHeartClicked: ThumbnailHeartClickedSVG,
  placedetailHeart: PlacedetailHeartSVG,
  placedetailView: PlacedetailViewSVG,
  placedetailShare: PlacedetailShareSVG,
  sortCheck: SortCheckSVG,
  checkDefault: CheckDefaultSVG,
  checkChecked: CheckCheckedSVG,
};

type Props = {
  name: IconOptions;
  width: number;
  height: number;
  color?: string;
};

export default function SVGIcons({ name, width, height, color }: Props) {
  const Icon = icons[name];

  return <Icon width={width} height={height} color={color} />;
}
