import MainCard from "../mainPage/MainCard";

interface Props {
  img: string;
  onClick: () => void;
}

const ReviewPhotoCard = ({ img, onClick }: Props) => {
  return (
    <MainCard
      className="w-[150px] h-[150px] bg-cover cursor-pointer"
      style={{ backgroundImage: `url(${img})` }}
      onClick={onClick}
    />
  );
};

export default ReviewPhotoCard;
