import ThemeCard from "./ThemeCard";
import { categories } from "@/configs/searchConstants";

const ThemeList = () => {
  return (
    <section className="flex flex-col gap-[24px] w-full h-[350px] py-[56px]">
      <div className="w-[117px] h-[51px]">
        <p className="text-[32px] font-dunggeunmiso font-bold text-[var(--main-color)]">
          카테고리
        </p>
      </div>
      <div className="flex w-full h-[187px] justify-between">
        {categories.map((category, i) => (
          <ThemeCard
            key={category}
            title={category}
            img={`/assets/images/categories/category_${i}.jpg`}
          />
        ))}
      </div>
    </section>
  );
};

export default ThemeList;
