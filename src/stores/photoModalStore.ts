import { create } from "zustand";
import type { ResponseImage } from "@/types/apiResponseTypes";

interface PhotoModalState {
  isOpen: boolean;
  photoList: ResponseImage[];
  index: number;
  modalOpen: (photoList: ResponseImage[], index: number) => void;
  modalClose: () => void;
}

export const usePhotoModalStore = create<PhotoModalState>((set) => ({
  isOpen: false,
  photoList: [],
  index: 0,
  modalOpen: (photoList: ResponseImage[], index: number) =>
    set({ isOpen: true, photoList, index }),
  modalClose: () => set({ isOpen: false, photoList: [], index: 0 }),
}));
