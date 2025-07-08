import PopularList from "@/components/PopularList";
import SearchPanel from "@/components/SearchPannel";
import ThemeList from "@/components/ThemeList";
import AiRecList from "@/components/AiRecList";

export default function MainScreen() {
  return (
    <main className="flex flex-col gap-[72px] py-[72px]">
      <SearchPanel />
      <ThemeList />
      <PopularList />
      <AiRecList />
    </main>
  );
}
