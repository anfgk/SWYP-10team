export default function SearchPanel() {
  const testOptions = ["지역", "날짜", "테마", "인원수"];
  return (
    <section className="flex justify-center w-full h-[62px]">
      <div className="w-[1281px] h-full flex justify-around items-center bg-[var(--search-bg)]">
        {testOptions.map((option) => (
          <div
            key={option}
            className="w-[160px] h-[34px] bg-[#FFFFFF] flex items-center justify-center"
          >
            {option}
          </div>
        ))}
      </div>
    </section>
  );
}
