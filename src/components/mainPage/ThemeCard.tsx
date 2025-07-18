import MainCard from "./MainCard";
import { useNavigate } from "react-router-dom";

interface Props {
  title?: string;
  caption?: string;
  img?: string;
  link?: string;
}

const ThemeCard = ({
  title = "title",
  caption = "caption",
  img = "/assets/images/theme/theme_1.jpg",
  link = "",
}: Props) => {
  const navigate = useNavigate();
  return (
    <MainCard
      className="w-[150px] h-[212px] gap-[8px] cursor-pointer"
      onClick={() => navigate(`/search/${link}`)}
    >
      <div className="w-full aspect-square overflow-hidden rounded-[16px]">
        <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
      </div>
      <div className="w-full h-[54px]">
        <p className="text-[20px] font-semibold">{title}</p>
        <p className="text-[16px]">{caption}</p>
      </div>
    </MainCard>
  );
};

export default ThemeCard;
