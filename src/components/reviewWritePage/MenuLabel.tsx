interface Props {
  text: string;
}
const MenuLabel = ({ text }: Props) => {
  return (
    <p className="w-[100px] h-[32px] flex items-center font-semibold text-[20px]">
      {text}
    </p>
  );
};

export default MenuLabel;
