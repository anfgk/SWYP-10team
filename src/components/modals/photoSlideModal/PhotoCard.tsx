import MainCard from "@/components/mainPage/MainCard";

interface Props {
  img: string;
  isActive: boolean;
  onClick: () => void;
}

const ReviewPhotoCard = ({ img, isActive, onClick }: Props) => {
  return (
    <MainCard
      className={`relative w-[116px] h-[116px] bg-cover cursor-pointer overflow-hidden ${isActive && "ring-3 ring-inset ring-[var(--main-color)]"}`}
      style={{ backgroundImage: `url(${img})` }}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-100" />
    </MainCard>
  );
};

export default ReviewPhotoCard;
