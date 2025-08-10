import MenuLabel from "./MenuLabel";

interface Props {
  title: string;
}
const ReviewTitleSection = ({ title }: Props) => {
  return (
    <section className="w-fit h-[32px] flex items-center gap-[44px] font-semibold">
      <MenuLabel text="방문한 장소" />
      <p className="w-fit h-full text-[18px] flex items-center">{title}</p>
    </section>
  );
};

export default ReviewTitleSection;
