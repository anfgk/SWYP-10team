import type { PlaceDetailData } from "@/types/apiResponseTypes";
import TabsInfo from "./TabsInfo";

interface Props {
  placeData: PlaceDetailData;
}

const PlaceInfoSection = ({ placeData }: Props) => {
  return (
    <section className="w-full h-fit flex flex-col gap-[24px] pb-[72px]">
      {placeData && (
        <p className="w-fit min-h-[32px] text-[16px] flex items-center">
          {placeData.overview}
        </p>
      )}

      <TabsInfo placeData={placeData} />
    </section>
  );
};

export default PlaceInfoSection;
