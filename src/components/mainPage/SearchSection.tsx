import SearchBar from "./SearchBar";

const SearchSection = () => {
  return (
    <nav
      className="w-full h-fit pt-[88px] pb-[36px] flex flex-col items-center"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.4) 31.62%, rgba(0, 0, 0, 0) 76.89%),
          linear-gradient(#FFAE001A, #FFAE001A),
          url('/assets/images/search_panel_bg.jpg')`,
        backgroundBlendMode: "multiply, overlay, normal",
        backgroundPosition: "50% 40%",
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
