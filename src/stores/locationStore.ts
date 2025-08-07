import { create } from "zustand";

interface LocationState {
  lon: number | null;
  lat: number | null;
  isCoordsSet: boolean;

  setIsCoordsSet: (val: boolean) => void;
  setCoords: (x: number, y: number) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  lon: null,
  lat: null,
  isCoordsSet: false,

  setIsCoordsSet: (val: boolean) => set({ isCoordsSet: val }),
  setCoords: (x: number, y: number) => set({ lon: x, lat: y }),
}));
