import SearchBar from "./SearchBar";

const SearchSection = () => {
  return (
    <nav className="w-full h-[329px] pt-[88px] pb-[36px] flex flex-col gap-[24px] items-center bg-[url('/assets/images/search_panel_bg.jpg')] bg-[50%_40%]">
      <div className="w-[1200px] h-[109px] ">
        <p className="text-[32px] font-bold text-[var(--header-text)]">
          반려동물과 함께하는 생활
        </p>
        <p className="text-[48px] font-dunggeunmiso font-bold text-[var(--header-text)]">
          어디가냥? 같이가개!
        </p>
      </div>
      <SearchBar />
    </nav>
  );
};

export default SearchSection;
