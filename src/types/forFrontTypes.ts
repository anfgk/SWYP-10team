import type {
  scheduleOptionsWithKey,
  SIDO_CODE,
} from "@/configs/searchConstants";
import type { ResponseImage } from "./apiResponseTypes";

type MixedImage = File | ResponseImage;

type RegionKey = keyof typeof SIDO_CODE;

type RegionCode = (typeof SIDO_CODE)[keyof typeof SIDO_CODE];

type ScheduleKey = keyof typeof scheduleOptionsWithKey;

type ScheduleCode =
  (typeof scheduleOptionsWithKey)[keyof typeof scheduleOptionsWithKey];

type PlannerStep = "select" | "result";

type Coord = { mapX: number; mapY: number };

type TabKey = "basic" | "guide" | "detail" | "companion";

type FieldDef = { label: string; key: string };

type TabFields = {
  basic: FieldDef[];
  guide: FieldDef[];
  detail: FieldDef[];
  companion: FieldDef[];
};

export type {
  MixedImage,
  RegionKey,
  RegionCode,
  ScheduleKey,
  ScheduleCode,
  PlannerStep,
  Coord,
  TabKey,
  FieldDef,
  TabFields,
};
