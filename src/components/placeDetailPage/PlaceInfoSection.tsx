import { emptyStringToDefault } from "@/lib/placeDetailUtils";
import PlaceDescriptionDiv from "./PlaceDescriptionDiv";
import type { PetGuideData } from "@/types/apiResponseTypes";

interface Props {
  desc: string;
  addr1: string;
  addr2: string;
  phoneNumber: string;
  petGuide: PetGuideData;
}

const PlaceInfoSection = ({
  desc,
  addr1,
  addr2,
  phoneNumber,
  petGuide,
}: Props) => {
  return (
    <section className="w-full h-fit flex flex-col gap-[16px] pb-[72px]">
      {/* 태그 디비전 */}
      {/* <div className="w-full h-[28px] flex gap-[8px]">
        {tags.map((tag, i) => (
          <TagLabel key={i} value={tag} />
        ))}
      </div> */}
      {/* 장소 정보 디비전 */}
      <div className="w-full h-fit flex flex-col gap-[8px]">
        <PlaceDescriptionDiv
          title="상세 정보"
          content={emptyStringToDefault(desc)}
        />
        <PlaceDescriptionDiv
          title="상세 주소"
          content={emptyStringToDefault(addr1 + addr2)}
        />
        <PlaceDescriptionDiv
          title="문의 및 안내"
          content={emptyStringToDefault(phoneNumber)}
        />
        <PlaceDescriptionDiv
          title="동반 안내"
          content={emptyStringToDefault(petGuide.allowedPetType)}
        />
        <PlaceDescriptionDiv
          title="동반 구역"
          content={emptyStringToDefault(petGuide.withPet)}
        />
        <PlaceDescriptionDiv
          title="주의 사항"
          content={emptyStringToDefault(petGuide.petPrep)}
        />
        <PlaceDescriptionDiv
          title="기타 정보"
          content={emptyStringToDefault(petGuide.etcInfo)}
        />
      </div>
    </section>
  );
};

export default PlaceInfoSection;
