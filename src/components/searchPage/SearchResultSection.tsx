import SearchResultList from "./SearchResultList";

const SearchResultSection = () => {
  return (
    <section className="w-full flex flex-col gap-[32px] pt-[44px] pb-[32px]">
      <p className="w-full h-[47px] font-semibold text-[24px] border-b-[1px]">
        검색결과
      </p>
      <SearchResultList />
    </section>
  );
};

export default SearchResultSection;
