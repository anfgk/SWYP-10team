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
  place = "난지 한강공원",
  tag = "물놀이",
  distance = 5,
  img = "http://tong.visitkorea.or.kr/cms/resource/42/2704942_image2_1.jpg",
  id = "test",
}: Props) => {
  const navigate = useNavigate();
  return (
    <MainCard
      className="relative w-[286px] h-[380px] bg-cover cursor-pointer transition-none hover:brightness-80"
      style={{ backgroundImage: `url(${img})` }}
      onClick={() => navigate(`/placedetail/${id}`)}
    >
      <div className="w-[193px] h-[348px] flex flex-col gap-[191px] pl-[16px] pt-[4px] text-[var(--card-text)] z-10">
        <div className="h-[115px]">
          <p className="h-[77px] text-[48px] font-bold">{rank}</p>
          <p className="h-[38px] text-[24px] font-semibold">{place}</p>
        </div>
        <div className="h-[42px]">
          <p className="h-[22px] text-[16px]">#{tag}</p>
          <p className="h-[22px] text-[14px]">여기서 {distance}km</p>
        </div>
      </div>
      {/*상단 그라데이션*/}
      <div
        className="absolute top-0 left-0 w-full h-[157px] rounded-[16px] z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, #000000 100%)`,
        }}
      ></div>
      {/*하단 그라데이션*/}
      {/* <div
        className="absolute bottom-0 left-0 w-full h-[120px] rounded-[16px] z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.33) 50%), url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(7px)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) -7.59%, rgba(0,0,0,0)) 100%",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) -7.59%, rgba(0,0,0,0)) 100%",
        }}
      /> */}
    </MainCard>
  );
};

export default PopularCard;
