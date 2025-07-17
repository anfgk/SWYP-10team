import { useNavigate } from "react-router-dom";
import MainCard from "./MainCard";

interface Props {
  rank?: number;
  tag?: string;
  place?: string;
  distance?: number;
  img?: string;
  id?: string;
}

const PopularCard = ({
  rank = 1,
  tag = "물놀이",
  place = "난지 한강공원",
  distance = 5,
  img = "/assets/samples/popularcard_sample.jpg",
  id = "test",
}: Props) => {
  const navigate = useNavigate();
  return (
    <MainCard
      className="w-[286px] h-[380px] bg-cover cursor-pointer"
      style={{ backgroundImage: `url(${img})` }}
      onClick={() => navigate(`/placedetail/${id}`)}
    >
      <div className="w-[193px] h-[348px] flex flex-col gap-[191px] pl-[16px] pt-[4px] text-[var(--card-text)]">
        <div className="h-[115px]">
          <p className="h-[77px] text-[48px] font-pretendard font-bold">
            {rank}
          </p>
          <p className="h-[38px] text-[24px] font-pretendard font-semibold">
            #{tag}
          </p>
        </div>
        <div className="h-[42px]">
          <p className="h-[22px] text-[16px] font-pretendard">{place}</p>
          <p className="h-[22px] text-[14px] font-pretendard">
            여기서 {distance}km
          </p>
        </div>
      </div>
    </MainCard>
  );
};

export default PopularCard;
