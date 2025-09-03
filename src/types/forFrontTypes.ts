import type { regionMap, scheduleOptions } from "@/configs/searchConstants";
import type { ResponseImage } from "./apiResponseTypes";

type MixedImage = File | ResponseImage;

type regionKey = keyof typeof regionMap;

type scheduleKey = (typeof scheduleOptions)[number];

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
  regionKey,
  scheduleKey,
  PlannerStep,
  Coord,
  TabKey,
  FieldDef,
  TabFields,
};
