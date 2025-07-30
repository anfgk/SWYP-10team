import SVGIcons from "./SVGIcons";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}
const SVGCheckBox = ({ checked, onChange }: Props) => {
  return (
    <button
      className="w-[24px] h-[24px] flex justify-center items-center cursor-pointer"
      onClick={() => onChange(!checked)}
    >
      <SVGIcons
        name={checked ? "checkChecked" : "checkDefault"}
        width={24}
        height={24}
      />
    </button>
  );
};

export default SVGCheckBox;
