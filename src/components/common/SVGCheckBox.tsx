import SVGIcons from "./SVGIcons";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}
const SVGCheckBox = ({ checked, onChange, id = "" }: Props) => {
  return (
    <button
      id={id}
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
