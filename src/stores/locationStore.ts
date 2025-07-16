import { create } from "zustand";

interface LocationState {
  lon: number | null;
  lat: number | null;

  setCoords: (x: number, y: number) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  lon: null,
  lat: null,
  setCoords: (x: number, y: number) => set({ lon: x, lat: y }),
}));
