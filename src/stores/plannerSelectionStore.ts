import type { RegionCode, ScheduleCode } from "@/types/forFrontTypes";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SelectionState {
  region: RegionCode | null;
  schedule: ScheduleCode | null;
  mood: string | null;

  setRegion: (region: RegionCode) => void;
  setSchedule: (schedule: ScheduleCode) => void;
  setMood: (mood: string) => void;
  clearSelection: () => void;
}

export const usePlannerSelectionStore = create<SelectionState>()(
  devtools((set) => ({
    region: null,
    schedule: null,
    mood: null,

    setRegion: (region: RegionCode) => set({ region: region }),
    setSchedule: (schedule: ScheduleCode) => set({ schedule: schedule }),
    setMood: (mood: string) => set({ mood: mood }),
    clearSelection: () => set({ region: null, schedule: null, mood: null }),
  }))
);
