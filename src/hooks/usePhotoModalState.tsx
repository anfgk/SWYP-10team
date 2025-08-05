import { useCallback, useState } from "react";

const usePhotoModalState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openModal = useCallback((idx: number) => {
    setIsOpen(true);
    setPhotoIndex(idx);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  return { isOpen, photoIndex, openModal, closeModal };
};

export { usePhotoModalState };
