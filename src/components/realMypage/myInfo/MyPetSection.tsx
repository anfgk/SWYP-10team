import { useMyPetSection } from "@/hooks/useMyPetSection";
import MyPetSlideSection from "./MyPetSlideSection";

const MyPetSection = () => {
  const { petList } = useMyPetSection();
  return (
    <section className="w-full h-fit flex flex-col gap-[16px]">
      <h2 className="w-full h-[32px] font-semibold text-[20px]">
        반려동물 정보
      </h2>

      <MyPetSlideSection petList={petList} />
      <div id="modal-root" />
    </section>
  );
};

export default MyPetSection;
