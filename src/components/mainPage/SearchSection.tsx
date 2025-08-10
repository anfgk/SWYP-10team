import SearchBar from "./SearchBar";

const SearchSection = () => {
  return (
    <nav
      className="relative w-full h-fit pt-[88px] pb-[36px] flex flex-col items-center bg-cover"
      style={{
        backgroundImage: `url('/assets/images/common/search_panel_bg.jpg')`,
      }}
    >
      <div className="w-[1200px] h-[109px] mb-[24px] z-20">
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
