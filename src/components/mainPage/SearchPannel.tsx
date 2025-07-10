const SearchPanel = () => {
  const testOptions = ["검색", "날짜", "카테고리"];
  return (
    <section className="flex justify-center w-full h-[62px]">
      <div className="w-[850px] h-full flex justify-around items-center bg-[var(--search-bg)]">
        {testOptions.map((option) => (
          <div
            key={option}
            className="w-[211px] h-[34px] bg-[#FFFFFF] flex items-center justify-center"
          >
            {option}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchPanel;
