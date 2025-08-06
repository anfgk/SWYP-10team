import { useNavigate } from "react-router-dom";
import MainCard from "./MainCard";

interface Props {
  desc?: string;
  img?: string;
  link?: string;
}

const AiRecCard = ({
  desc = "",
  img = "/assets/samples/aicard_sample.png",
  link = "",
}: Props) => {
  const navigate = useNavigate();

  return (
    <MainCard
      className="bg-[var(--card-bg)] w-[1200px] h-[304px] cursor-pointer bg-cover bg-center"
      // style={{
      //   backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.5) 6.08%, rgba(0, 0, 0, 0) 63.54%), url(${img})`,
      // }}
      style={{
        backgroundImage: `url(${img})`,
      }}
      onClick={() => navigate(`/${link}`)}
    >
      <div className="w-[182px] h-[102px] mt-[50px] ml-[67px]">
        <p className="text-[32px] font-semibold text-black break-keep">
          {desc}
        </p>
      </div>
    </MainCard>
  );
};

export default AiRecCard;
