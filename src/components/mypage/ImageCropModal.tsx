import { useState, useRef, useEffect } from "react";
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
  const [imageSrc, setImageSrc] = useState<string>("");
  const [cropArea, setCropArea] = useState({ x: 10, y: 10, size: 60 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target?.result as string);
      reader.readAsDataURL(imageFile);
    } else if (currentImage && !imageSrc) {
      setImageSrc(currentImage);
    }
  }, [imageFile, currentImage, imageSrc]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current || !imageRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDragging(true);
    setDragStart({ x, y });

    const imgRect = imageRef.current.getBoundingClientRect();
    const adjustedX = (x - imageOffset.x) / zoom;
    const adjustedY = (y - imageOffset.y) / zoom;
    const percentX = (adjustedX / imgRect.width) * 100;
    const percentY = (adjustedY / imgRect.height) * 100;

    const newX = Math.max(
      0,
      Math.min(percentX - cropArea.size / 2, 100 - cropArea.size)
    );
    const newY = Math.max(
      0,
      Math.min(percentY - cropArea.size / 2, 100 - cropArea.size)
    );
    setCropArea((prev) => ({ ...prev, x: newX, y: newY }));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current || !imageRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const deltaX = x - dragStart.x;
    const deltaY = y - dragStart.y;

    const imgRect = imageRef.current.getBoundingClientRect();
    const deltaPercentX = (deltaX / zoom / imgRect.width) * 100;
    const deltaPercentY = (deltaY / zoom / imgRect.height) * 100;

    setCropArea((prev) => ({
      ...prev,
      x: Math.max(0, Math.min(prev.x + deltaPercentX, 100 - cropArea.size)),
      y: Math.max(0, Math.min(prev.y + deltaPercentY, 100 - cropArea.size)),
    }));

    setDragStart({ x, y });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.1, Math.min(5, zoom * delta));

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const newOffsetX = mouseX - (mouseX - imageOffset.x) * (newZoom / zoom);
      const newOffsetY = mouseY - (mouseY - imageOffset.y) * (newZoom / zoom);
      setImageOffset({ x: newOffsetX, y: newOffsetY });
    }
    setZoom(newZoom);
  };

  const handleCrop = () => {
    if (canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const image = imageRef.current;

      if (ctx) {
        canvas.width = 200;
        canvas.height = 200;

        const imgRect = image.getBoundingClientRect();
        const actualImgWidth = imgRect.width / zoom;
        const actualImgHeight = imgRect.height / zoom;

        const cropX =
          (cropArea.x / 100) * actualImgWidth - imageOffset.x / zoom;
        const cropY =
          (cropArea.y / 100) * actualImgHeight - imageOffset.y / zoom;
        const cropSize =
          Math.min(actualImgWidth, actualImgHeight) * (cropArea.size / 100);

        const scaleX = image.naturalWidth / actualImgWidth;
        const scaleY = image.naturalHeight / actualImgHeight;

        const sourceX = Math.max(0, cropX * scaleX);
        const sourceY = Math.max(0, cropY * scaleY);
        const sourceSize = Math.min(
          cropSize * Math.min(scaleX, scaleY),
          Math.min(image.naturalWidth - sourceX, image.naturalHeight - sourceY)
        );

        ctx.drawImage(
          image,
          sourceX,
          sourceY,
          sourceSize,
          sourceSize,
          0,
          0,
          200,
          200
        );
        onCrop(canvas.toDataURL("image/jpeg", 0.8));
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 p-4">
      <div className="bg-gray-100 p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">프로필 이미지 편집</h3>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <PageButton
            text={imageSrc ? "이미지 변경" : "이미지 선택"}
            variant="default"
            onClick={() => fileInputRef.current?.click()}
          />
        </div>

        <p className="text-sm text-gray-600 mb-4">
          이미지에서 원하는 부분을 선택하세요 (파란색 사각형 영역이 프로필로
          사용됩니다)
        </p>

        <div className="relative mb-4 overflow-auto w-full h-96 border border-gray-300 rounded-lg">
          <div
            ref={containerRef}
            className="relative cursor-move w-full h-full flex items-center justify-center"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onWheel={handleWheel}
          >
            {imageSrc ? (
              <img
                ref={imageRef}
                src={imageSrc}
                alt="크롭할 이미지"
                className="max-w-full max-h-full object-contain"
                style={{
                  transform: `scale(${zoom}) translate(${imageOffset.x / zoom}px, ${imageOffset.y / zoom}px)`,
                  transformOrigin: "center",
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                이미지를 선택해주세요
              </div>
            )}
            {imageSrc && (
              <div
                className="absolute border-2 border-blue-500 pointer-events-none"
                style={{
                  left: `${cropArea.x}%`,
                  top: `${cropArea.y}%`,
                  width: "200px",
                  height: "200px",
                  backgroundColor: "transparent",
                }}
              />
            )}
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <PageButton text="취소" variant="default" onClick={onClose} />
          <PageButton text="적용" variant="default" onClick={handleCrop} />
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default ImageCropModal;
