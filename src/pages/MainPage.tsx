import PopularSection from "@/components/mainPage/PopularSection";
import SearchPanel from "@/components/mainPage/SearchPannel";
import ThemeSection from "@/components/mainPage/ThemeSection";
import AiRecSection from "@/components/mainPage/AiRecSection";

const MainPage = () => {
  return (
    <main className="flex flex-col gap-[72px] py-[72px]">
      <SearchPanel />
      <ThemeSection />
      <PopularSection />
      <AiRecSection />
    </main>
  );
};

export default MainPage;
