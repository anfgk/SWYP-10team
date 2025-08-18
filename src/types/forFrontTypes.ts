import type { regionMap, scheduleOptions } from "@/configs/searchConstants";
import type { ResponseImage } from "./apiResponseTypes";

type MixedImage = File | ResponseImage;

type regionKey = keyof typeof regionMap;

type scheduleKey = (typeof scheduleOptions)[number];

export type { MixedImage, regionKey, scheduleKey };
