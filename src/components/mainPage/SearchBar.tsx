const SearchBar = () => {
  const testOptions = ["검색", "날짜", "카테고리"];
  return (
    <div className="w-[1200px] h-[72px] flex justify-around items-center rounded-[40px] bg-[var(--search-bg)]">
      {testOptions.map((option) => (
        <div
          key={option}
          className="w-[211px] h-[34px] bg-[#FFFFFF] flex items-center justify-center"
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default SearchBar;
