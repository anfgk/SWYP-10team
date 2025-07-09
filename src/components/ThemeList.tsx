import ThemeCard from "./ThemeCard";

export default function ThemeList() {
  const testTheme = [1, 2, 3, 4, 5, 6, 7];

  return (
    <section className="flex justify-center items-center w-full h-[423px]">
      <div className="flex flex-col justify-between w-[1536px] h-[317px]">
        <div className="flex justify-between">
          <p className="text-[48px] text-[var(--text-color)]">테마</p>
          <></>
        </div>
        <div className="flex gap-[32px]">
          {testTheme.map((theme) => (
            <ThemeCard key={theme} value={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}
