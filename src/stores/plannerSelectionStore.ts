import type { regionKey, scheduleKey } from "@/types/forFrontTypes";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SelectionState {
  region: regionKey | null;
  schedule: scheduleKey | null;
  mood: string | null;

  setRegion: (region: regionKey) => void;
  setSchedule: (schedule: scheduleKey) => void;
  setMood: (mood: string) => void;
  clearSelection: () => void;
}

export const usePlannerSelectionStore = create<SelectionState>()(
  devtools((set) => ({
    region: null,
    schedule: null,
    mood: null,

    setRegion: (region: regionKey) => set({ region: region }),
    setSchedule: (schedule: scheduleKey) => set({ schedule: schedule }),
    setMood: (mood: string) => set({ mood: mood }),
    clearSelection: () => set({ region: null, schedule: null, mood: null }),
  }))
);
