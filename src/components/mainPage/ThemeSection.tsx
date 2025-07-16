import ThemeCard from "./ThemeCard";

const ThemeList = () => {
  const testTheme = [1, 2, 3, 4, 5, 6, 7];

  return (
    <section className="flex flex-col gap-[24px] w-full h-[375px] py-[44px]">
      <div className="w-[60px] h-[51px]">
        <p className="text-[32px] font-bold text-[var(--main-color)]">테마</p>
      </div>
      <div className="flex w-full h-[212px] justify-between">
        {testTheme.map((theme) => (
          <ThemeCard key={theme} />
        ))}
      </div>
    </section>
  );
};

export default ThemeList;
