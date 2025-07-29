interface Props {
  title?: string;
  thumbnail?: string;
  isVisited?: boolean;
}

const PlaceMainSection = ({
  title = "도그밀리 DOGMILY",
  thumbnail = "/assets/samples/placeThumbnail_sample.png",
  isVisited = false,
}: Props) => {
  return (
    <section className="w-[full] h-[494px] flex flex-col items-center gap-[16px] pt-[88px] pb-[44px]">
      <h2 className="w-fit h-[51px] text-[32px] font-semibold">{title}</h2>
      <div className="w-[340px] h-[255px] rounded-[16px] overflow-hidden">
        <img src={thumbnail} />
      </div>
      <div className="w-[136px] h-[24px] flex gap-[4px]">
        <label htmlFor="is_visited" className="w-[108px] h-[20px] text-[14px]">
          방문한 장소인가요?
        </label>
        <input
          id="is_visited"
          type="checkbox"
          className="w-[20px] h-[20px] rounded-[50px] appearance-none border-[1.5px] border-[#BFBFBF38] checked:bg-[#BFBFBF38]"
          defaultChecked={isVisited}
          onChange={(e) => alert(e.target.checked)}
        />
      </div>
    </section>
  );
};

export default PlaceMainSection;
