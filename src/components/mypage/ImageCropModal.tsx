import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import PageButton from "@/components/ui/page-button";
import "./ImageCropModal.css";

interface ImageCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCrop: (croppedImage: string) => void;
  imageFile: File | null;
  currentImage?: string;
}

const ImageCropModal = ({
  isOpen,
  onClose,
  onCrop,
  imageFile,
  currentImage,
}: ImageCropModalProps) => {
  const cropperRef = useRef<HTMLImageElement>(null);
  const [image, setImage] = useState<string>("");

  React.useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(imageFile);
    } else if (currentImage && !image) {
      setImage(currentImage);
    }
  }, [imageFile, currentImage, image]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    const cropper = (cropperRef.current as any)?.cropper;
    if (cropper) {
      const croppedDataUrl = cropper
        .getCroppedCanvas({
          width: 300,
          height: 300,
          imageSmoothingQuality: "high",
        })
        .toDataURL("image/jpeg", 0.9);
      onCrop(croppedDataUrl);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">프로필 이미지 편집</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="profile-image-upload"
          />
          <PageButton
            text={image ? "이미지 변경" : "이미지 선택"}
            variant="default"
            onClick={() =>
              document.getElementById("profile-image-upload")?.click()
            }
          />
        </div>
        <p className="text-sm text-gray-600 mb-4">
          이미지를 정사각형(300x300)으로 크롭하세요.
        </p>
        <div className="mb-4">
          {image ? (
            <Cropper
              src={image}
              style={{ height: 400, width: "100%" }}
              aspectRatio={1}
              viewMode={2}
              guides={false}
              background={false}
              autoCropArea={0.8}
              cropBoxResizable={true}
              cropBoxMovable={true}
              dragMode="crop"
              minCropBoxWidth={100}
              minCropBoxHeight={100}
              zoomable={false}
              rotatable={false}
              scalable={false}
              wheelZoomRatio={0}
              ref={cropperRef}
              className="custom-cropper"
            />
          ) : (
            <div className="w-full h-[400px] flex items-center justify-center text-gray-500 bg-gray-100 rounded-lg">
              이미지를 선택해주세요
            </div>
          )}
        </div>
        <div className="flex gap-2 justify-end">
          <PageButton text="취소" variant="default" onClick={onClose} />
          <PageButton text="적용" variant="default" onClick={handleCrop} />
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;
