import PopularList from "@/components/mainPage/PopularList";
import SearchPanel from "@/components/mainPage/SearchPannel";
import ThemeList from "@/components/mainPage/ThemeList";
import AiRecList from "@/components/mainPage/AiRecList";

const MainPage = () => {
  return (
    <main className="flex flex-col gap-[72px] py-[72px]">
      <SearchPanel />
      <ThemeList />
      <PopularList />
      <AiRecList />
    </main>
  );
};

export default MainPage;
