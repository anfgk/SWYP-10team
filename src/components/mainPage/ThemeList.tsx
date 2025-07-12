import ThemeCard from "./ThemeCard";

const ThemeList = () => {
  const testTheme = [1, 2, 3, 4, 5, 6, 7];

  return (
    <section className="flex justify-center items-center w-full h-[264.38px]">
      <div className="flex flex-col justify-between w-[1200px] h-[228.88px]">
        <div className="flex">
          <p className="text-[30px] text-[var(--text-color)]">테마</p>
        </div>
        <div className="flex gap-[32px]">
          {testTheme.map((theme) => (
            <ThemeCard key={theme} value={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThemeList;
