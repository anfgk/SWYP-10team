import type { PetData } from "@/types/apiResponseTypes";
import { useState } from "react";
import MyPetCard from "./MyPetCard";
import MyPetAddCard from "./MyPetAddCard";
import MyPetAddModal from "@/components/modals/MyPetAddModal";

interface Props {
  petList?: PetData[];
}

const MyPetSlideSection = ({ petList = [] }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const toggleLeft = () => {
    setIndex((prev) => {
      if (prev <= 0) return prev; // 이미 왼쪽 끝이면 그대로
      return prev - 1;
    });
  };

  const toggleRight = () => {
    setIndex((prev) => {
      if (prev >= petList.length) return prev; // AddCard 포함 → 마지막 index는 petList.length
      return prev + 1;
    });
  };

  return (
    <section className="w-full h-[308px] flex items-center gap-[16px]">
      <button className="w-[24px] h-[24px] cursor-pointer" onClick={toggleLeft}>
        <img
          src="/assets/buttons/button_photo_left.png"
          alt="left"
          className="w-full h-full"
        />
      </button>

      <article className="w-[816px] h-[308px] mx-auto relative rounded-[14px] overflow-hidden">
        {/* 카드 슬라이드 */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${index * 816}px)`,
            width: `${100 * (petList.length + 1)}%`,
          }}
        >
          {petList.map((pet, i) => (
            <div key={i} className="w-[816px] flex-shrink-0">
              <MyPetCard petData={pet} />
            </div>
          ))}
          <MyPetAddCard setIsOpen={setIsOpen} />
        </div>
      </article>
      <button
        className="w-[24px] h-[24px] cursor-pointer"
        onClick={toggleRight}
      >
        <img
          src="/assets/buttons/button_photo_right.png"
          alt="left"
          className="w-full h-full"
        />
      </button>
      {isOpen && <MyPetAddModal onClose={() => setIsOpen(false)} />}
    </section>
  );
};

export default MyPetSlideSection;
