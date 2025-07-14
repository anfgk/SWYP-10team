import { Link } from "react-router-dom";
import PopularCard from "./PopularCard";

const PopularList = () => {
  const testPopular = [1, 2, 3, 4];

  return (
    <section className="flex justify-center items-center w-full h-[516.5px] py-[52px]">
      <div className="flex flex-col justify-between items-center w-full h-[402.59px] ">
        <div className="flex justify-between w-[1200px]">
          <p className="text-[38.18px] text-[var(--text-color)]">인기</p>
          <Link to={"/"} className="text-[19.85px]">
            더보기
          </Link>
        </div>
        <div className="flex gap-[32px] w-[1200px] h-[324.59px]">
          {testPopular.map((popular) => (
            <PopularCard key={popular} value={popular} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularList;
