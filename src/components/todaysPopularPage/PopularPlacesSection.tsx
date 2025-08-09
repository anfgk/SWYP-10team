import { usePopularPlaces } from "@/hooks/usePopularPlaces";
import SearchResultList from "../searchPage/SearchResultList";

const PopularPlacesSection = () => {
  const { loading, resultList } = usePopularPlaces();

  return (
    <section className="w-full flex flex-col gap-[32px] pt-[44px] pb-[32px] ">
      <div className="w-full h-[55px] flex justify-between border-b-[1px]">
        <p className="font-semibold text-[24px] ">랭킹 Top 20</p>
      </div>
      {loading ? (
        <p className="text-center text-[14px] text-[var(--place-neutral)] py-8">
          불러오는 중...
        </p>
      ) : (
        <SearchResultList searchDataList={resultList} />
      )}
    </section>
  );
};

export default PopularPlacesSection;
