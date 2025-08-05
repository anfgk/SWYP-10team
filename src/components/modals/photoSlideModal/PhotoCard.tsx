import MainCard from "@/components/mainPage/MainCard";

interface Props {
  img: string;
  isActive: boolean;
  onClick: () => void;
}

const ReviewPhotoCard = ({ img, isActive, onClick }: Props) => {
  return (
    <MainCard
      className={`w-[116px] h-[116px] bg-cover cursor-pointer${isActive && " border-3 border-[var(--main-color)]"}`}
      style={{ backgroundImage: `url(${img})` }}
      onClick={onClick}
    />
  );
};

export default ReviewPhotoCard;
