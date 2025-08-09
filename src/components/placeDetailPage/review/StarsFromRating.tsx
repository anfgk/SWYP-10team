import fullStar from "/assets/icons/star_full.png";
import halfStar from "/assets/icons/star_half.png";
import emptyStar from "/assets/icons/star_empty.png";

interface Props {
  rating: number;
}

const StarsFromRating = ({ rating }: Props) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <img key={i} src={fullStar} alt="별" className="w-[24px] h-[24px]" />,
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <img
          key={i}
          src={halfStar}
          alt="반 별"
          className="w-[24px] h-[24px]"
        />,
      );
    } else {
      stars.push(
        <img
          key={i}
          src={emptyStar}
          alt="빈 별"
          className="w-[24px] h-[24px]"
        />,
      );
    }
  }
  return <div className="w-[120px] h-[24px] flex">{stars}</div>;
};

export default StarsFromRating;
