import { labels } from "@/configs/TabTableOptions";
import type { PlaceDetailData } from "@/types/apiResponseTypes";
import type { TabKey } from "@/types/forFrontTypes";
import { useState } from "react";
import TabDescription from "./TabDescription";

interface Props {
  placeData: PlaceDetailData;
}

const TabsInfo = ({ placeData }: Props) => {
  const [active, setActive] = useState<TabKey>("basic");

  return (
    <div className="w-full h-fit flex flex-col gap-[44px]">
      {/* 탭 버튼 섹션 */}
      <div className="w-full flex h-[40px]">
        {(["basic", "guide", "detail", "companion"] as TabKey[]).map(
          (t, idx) => {
            const isActive = active === t;
            const radius =
              idx === 0
                ? "rounded-l-[50px]"
                : idx === 3
                  ? "rounded-r-[50px]"
                  : "";
            return (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={[
                  `h-full w-[300px] font-semibold text-[18px] border-[1px] cursor-pointer ${isActive ? "bg-[var(--tab-bg)] text-[var(--main-color)] border-[var(--tab-fg)]" : "text-[var(--place-detail-heart)] border-[var(--search-element-border)]"}`,
                  radius,
                ].join(" ")}
              >
                {labels[t]}
              </button>
            );
          }
        )}
      </div>
      {placeData && <TabDescription placeData={placeData} tabKey={active} />}
    </div>
  );
};

export default TabsInfo;
