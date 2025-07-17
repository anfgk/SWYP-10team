import { Link } from "react-router-dom";
import PopularCard from "./PopularCard";

const PopularList = () => {
  const testPopular = [1, 2, 3, 4];

  return (
    <section className="flex flex-col gap-[10px] w-full h-[527px] py-[36px]">
      <div className="flex justify-between items-center w-full h-[51px]">
        <p className="text-[32px] font-dunggeunmiso font-bold text-[var(--main-color)]">
          인기
        </p>
        <Link to={"/search"} className="text-[14px] font-pretendard">
          더보기
        </Link>
      </div>
      <div className="flex w-full h-[380px] justify-between">
        {testPopular.map((popular) => (
          <PopularCard key={popular} />
        ))}
      </div>
    </section>
  );
};

export default PopularList;
