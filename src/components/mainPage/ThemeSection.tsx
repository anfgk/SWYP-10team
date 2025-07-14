import ThemeCard from "./ThemeCard";

const ThemeList = () => {
  const testTheme = [1, 2, 3, 4, 5, 6, 7];

  return (
    <section className="flex justify-center items-center w-full h-[225px]">
      <div className="flex flex-col gap-[24px] w-[1200px] h-full">
        <div className="flex">
          <p className="text-[30px] text-[var(--text-color)]">테마</p>
        </div>
        <div className="flex w-full h-[150px] justify-between">
          {testTheme.map((theme) => (
            <ThemeCard key={theme} value={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThemeList;
