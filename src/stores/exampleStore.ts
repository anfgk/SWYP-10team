import { create } from "zustand";
import type { exampleStoreState } from "@/types/exampleStoreState";

export const useAudioInputStore = create<exampleStoreState>((set) => ({
  example: "test",

  setExample: (newExample: string) => set({ example: newExample }),
}));
