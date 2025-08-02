import { useAuthStore } from "@/stores/authStore";
import { categories, regionMap } from "@/configs/searchConstants";
import useSearchBarState from "@/hooks/useSearchBarState";

import SearchSelectBox from "./SearchSelectBox";
import SubRegionList from "./SubRegionList";
import { Input } from "../ui/input";

const SearchBar = () => {
  const {
    selectedRegion,
    selectedCategory,
    selectedSubRegion,
    inputkeyword,
    setSelectedRegion,
    setSelectedCategory,
    setSelectedSubRegion,
    setInputKeyword,
    onSearch,
  } = useSearchBarState();

  return (
    <div className="w-[1200px] h-fit flex flex-wrap rounded-[40px] bg-[var(--search-bar-bg)] px-[12px] py-[12px] gap-[12px] shadow-[0px_0px_1px_0px_#00000014,0px_1px_2px_0px_#0000001F] z-20">
      <div className="flex flex-grow gap-[12px]">
        <SearchSelectBox
          options={Object.keys(regionMap)}
          placeholder="지역 명"
          value={selectedRegion}
          onChange={setSelectedRegion}
        />

        <SearchSelectBox
          options={categories}
          placeholder="카테고리"
          value={selectedCategory}
          onChange={setSelectedCategory}
        />

        {/* <SearchSelectBox
          options={test}
          placeholder="반려동물 정보"
          value={selectedPet}
          onChange={setSelectedPet}
          isDisabled={!user}
        /> */}

        <div className="relative h-[48px] flex-1">
          <img
            src="/assets/icons/search.png"
            alt="search_icon"
            className="absolute left-[16px] top-[12px] w-[24px] h-[24px]"
          />
          <Input
            id="place_input"
            className="w-full h-full rounded-[26px] bg-[var(--search-element-bg)] !text-[14px] pl-[40px] focus:ring-[1px] focus:ring-[var(--main-color)]"
            placeholder="장소 명"
            defaultValue={inputkeyword}
            onChange={(e) => setInputKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center w-[48px] h-[48px] shrink-0">
        <button className="w-[40px] h-[40px] cursor-pointer" onClick={onSearch}>
          <img
            src="/assets/buttons/search_button.png"
            alt="left"
            className="w-full h-full"
          />
        </button>
      </div>

      {selectedRegion && regionMap[selectedRegion] && (
        <SubRegionList
          subregions={regionMap[selectedRegion]}
          current={selectedSubRegion}
          onChange={setSelectedSubRegion}
        />
      )}
    </div>
  );
};

export default SearchBar;
