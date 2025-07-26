import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import PageButton from "@/components/ui/page-button";

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
      <style>
        {`
        /* Cropper.js 기본 스타일 */
        .cropper-container {
          direction: ltr;
          font-size: 0;
          line-height: 0;
          position: relative;
          touch-action: none;
          -ms-touch-action: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
        }
        
        .cropper-container img {
          display: block;
          height: 100%;
          image-orientation: 0deg;
          max-height: none !important;
          max-width: none !important;
          min-height: 0 !important;
          min-width: 0 !important;
          width: 100%;
        }
        
        .cropper-wrap-box {
          background-color:#fbfbfb;
          border-radius: 8px;
          font-size: 0;
          line-height: 0;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }
        
        .cropper-canvas {
          font-size: 0;
          line-height: 0;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }
        
        .cropper-drag-box {
          background-color: #fff;
          opacity: 0;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        
        .cropper-modal {
          background-color: rgba(214, 214, 214, 0.15) !important;
          opacity: 0.5;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        
        .cropper-view-box {
          outline: 1px solid #39f;
          outline-color: rgba(51, 153, 255, 0.75);
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        
        .cropper-face {
          background-color: inherit;
          height: 100%;
          opacity: 0.1;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }
        
        .cropper-line {
          background-color: #39f;
          font-size: 0;
          line-height: 0;
          position: absolute;
        }
        
        .cropper-point {
          background-color: #39f;
          border: 1px solid #fff;
          font-size: 0;
          height: 10px;
          line-height: 0;
          opacity: 0.75;
          position: absolute;
          width: 10px;
        }
        
        .cropper-point.point-e {
          cursor: e-resize;
          margin-top: -5px;
          right: -5px;
          top: 50%;
        }
        
        .cropper-point.point-n {
          cursor: n-resize;
          left: 50%;
          margin-left: -5px;
          top: -5px;
        }
        
        .cropper-point.point-w {
          cursor: w-resize;
          left: -5px;
          margin-top: -5px;
          top: 50%;
        }
        
        .cropper-point.point-s {
          bottom: -5px;
          cursor: s-resize;
          left: 50%;
          margin-left: -5px;
        }
        
        .cropper-point.point-ne {
          cursor: ne-resize;
          right: -5px;
          top: -5px;
        }
        
        .cropper-point.point-nw {
          cursor: nw-resize;
          left: -5px;
          top: -5px;
        }
        
        .cropper-point.point-sw {
          bottom: -5px;
          cursor: sw-resize;
          left: -5px;
        }
        
        .cropper-point.point-se {
          bottom: -5px;
          cursor: se-resize;
          right: -5px;
        }
        
        .cropper-point.point-se::before {
          background-color: #39f;
          bottom: -50%;
          content: " ";
          height: 200%;
          left: -50%;
          opacity: 0;
          position: absolute;
          top: -50%;
          width: 200%;
        }
        
        .cropper-invisible {
          opacity: 0;
        }
        
        .cropper-bg {
          background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAABPWDiAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3pBlOMNHqEwAAKbwDAXekAoIAAAAASUVORK5CYII=");
        }
        
        .cropper-hide {
          display: block !important;
          height: 0 !important;
          width: 0 !important;
        }
        
        .cropper-hidden {
          display: none !important;
        }
        
        .cropper-move {
          cursor: move;
        }
        
        .cropper-crop {
          cursor: crosshair;
        }
        
        .cropper-disabled .cropper-drag-box,
        .cropper-disabled .cropper-face,
        .cropper-disabled .cropper-line,
        .cropper-disabled .cropper-point {
          cursor: not-allowed;
        }
        `}
      </style>
    </div>
  );
};

export default ImageCropModal;
