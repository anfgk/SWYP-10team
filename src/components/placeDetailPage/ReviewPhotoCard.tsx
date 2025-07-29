import MainCard from "../mainPage/MainCard";

interface Props {
  img: string;
  index: number;
}

const ReviewPhotoCard = ({ img, index }: Props) => {
  return (
    <MainCard
      className="w-[150px] h-[150px] bg-cover cursor-pointer"
      style={{ backgroundImage: `url(${img})` }}
      onClick={() => alert(index)}
    />
  );
};

export default ReviewPhotoCard;
