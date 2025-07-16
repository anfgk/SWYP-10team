import SearchResultCard from "./SearchResultCard";

const SearchResultList = () => {
  const test = [1, 2, 3, 4];
  return (
    <div className="w-full flex flex-col gap-[24px]">
      {test.map((t) => (
        <SearchResultCard key={t} />
      ))}
    </div>
  );
};

export default SearchResultList;
