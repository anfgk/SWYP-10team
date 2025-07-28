import type { IconOptions } from "@/configs/svgOptions";
import SVGIcons from "../layout/SVGIcons";
interface Props {
  svgname: IconOptions;
  width: number;
  height: number;
  color?: string;
  onClick: () => void;
}
const SvgButton = ({ svgname, width, height, onClick, color }: Props) => {
  return (
    <button
      className="w-[40px] h-[40px] cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onClick;
      }}
    >
      <SVGIcons
        name={svgname}
        width={width}
        height={height}
        color={`${color}`}
      />
    </button>
  );
};

export default SvgButton;
