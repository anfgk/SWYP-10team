import type { PlaceDetailData } from "@/types/apiResponseTypes";
import { tabsByContentType } from "@/configs/TabTableOptions";
import TabInfoLayout from "./TabInfoLayout";
import PlaceDescriptionDiv from "./PlaceDescriptionDiv";
import { formatPlaceValue, getValueByPath } from "@/lib/placeDetailUtils";
import { removeTags } from "@/lib/commonUtils";
import type { TabKey } from "@/types/forFrontTypes";

interface Props {
  placeData: PlaceDetailData;
  tabKey: TabKey;
}

const TabDescription = ({ placeData, tabKey }: Props) => {
  const typeConfig = tabsByContentType[placeData.contentTypeId];
  const fields = (typeConfig && typeConfig[tabKey]) ?? [];
  return (
    <TabInfoLayout>
      {fields.length === 0 ? (
        <PlaceDescriptionDiv title="정보" content="표시할 항목이 없습니다." />
      ) : (
        fields.map((element, i) => (
          <PlaceDescriptionDiv
            key={i}
            title={element.label}
            content={removeTags(
              String(
                formatPlaceValue(
                  element.render
                    ? element.render(placeData)
                    : getValueByPath(placeData, element.key!)
                )
              )
            )}
          />
        ))
      )}
    </TabInfoLayout>
  );
};

export default TabDescription;
