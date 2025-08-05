import MainCard from "../../mainPage/MainCard";

interface Props {
  img: string;
  onClick: () => void;
}

const ReviewPhotoCard = ({ img, onClick }: Props) => {
  return (
    <MainCard
      className="w-[150px] h-[150px] bg-cover cursor-pointer"
      onClick={onClick}
    >
      <img src={img} className="w-full h-full object-cover object-center" />
    </MainCard>
  );
};

export default ReviewPhotoCard;
