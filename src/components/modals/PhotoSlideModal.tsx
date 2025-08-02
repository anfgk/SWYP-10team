import { useEffect, useState } from "react";

interface Props {
  photoList: string[];
  index: number;
  onClose: () => void;
}

const PhotoSlideModal = ({ photoList, index, onClose }: Props) => {
  const [currentIdx, setCurrentIdx] = useState(index);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-100 flex justify-center items-center bg-[var(--modal-bg)]"
      onClick={onClose}
    >
      <div className="w-[888px] h-[600px] rounded-[24px]">
        <img src={photoList[currentIdx]} alt="photo_slide" className="" />
      </div>
    </div>
  );
};

export default PhotoSlideModal;
