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
  const [cropArea, setCropArea] = useState({ x: 50, y: 50, size: 60 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current || !imageRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDragging(true);
    setDragStart({ x, y });

    const imgRect = imageRef.current.getBoundingClientRect();

    // 이미지 영역 내에서만 크롭 영역을 설정
    if (
      x >= imgRect.left &&
      x <= imgRect.right &&
      y >= imgRect.top &&
      y <= imgRect.bottom
    ) {
      const percentX = ((x - imgRect.left) / imgRect.width) * 100;
      const percentY = ((y - imgRect.top) / imgRect.height) * 100;

      // 크롭 영역의 중심이 마우스 위치에 오도록 설정
      const newX = Math.max(
        0,
        Math.min(percentX - cropArea.size / 2, 100 - cropArea.size)
      );
      const newY = Math.max(
        0,
        Math.min(percentY - cropArea.size / 2, 100 - cropArea.size)
      );
      setCropArea((prev) => ({ ...prev, x: newX, y: newY }));
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current || !imageRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const imgRect = imageRef.current.getBoundingClientRect();

    // 이미지 영역 내에서만 크롭 영역을 이동
    if (
      x >= imgRect.left &&
      x <= imgRect.right &&
      y >= imgRect.top &&
      y <= imgRect.bottom
    ) {
      const percentX = ((x - imgRect.left) / imgRect.width) * 100;
      const percentY = ((y - imgRect.top) / imgRect.height) * 100;

      // 크롭 영역의 중심이 마우스 위치에 오도록 설정
      const newX = Math.max(
        0,
        Math.min(percentX - cropArea.size / 2, 100 - cropArea.size)
      );
      const newY = Math.max(
        0,
        Math.min(percentY - cropArea.size / 2, 100 - cropArea.size)
      );

      setCropArea((prev) => ({ ...prev, x: newX, y: newY }));
    }
  };

  const handleCrop = () => {
    if (canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const image = imageRef.current;

      if (ctx) {
        canvas.width = 200;
        canvas.height = 200;

        const cropX = (cropArea.x / 100) * image.naturalWidth;
        const cropY = (cropArea.y / 100) * image.naturalHeight;
        const cropSize =
          Math.min(image.naturalWidth, image.naturalHeight) *
          (cropArea.size / 100);

        const sourceX = Math.max(0, cropX);
        const sourceY = Math.max(0, cropY);
        const sourceSize = Math.min(
          cropSize,
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
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
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

        <div className="mb-4"></div>

        <div className="relative mb-4 w-full h-[500px] border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
          <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center"
            onMouseMove={(e) => {
              if (!isDragging && imageRef.current) {
                const rect = containerRef.current?.getBoundingClientRect();
                if (!rect) return;

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const imgRect = imageRef.current.getBoundingClientRect();

                // 이미지 영역 내에서만 크롭 영역을 미리보기로 이동
                if (
                  x >= imgRect.left &&
                  x <= imgRect.right &&
                  y >= imgRect.top &&
                  y <= imgRect.bottom
                ) {
                  const percentX = ((x - imgRect.left) / imgRect.width) * 100;
                  const percentY = ((y - imgRect.top) / imgRect.height) * 100;

                  const newX = Math.max(
                    0,
                    Math.min(percentX - cropArea.size / 2, 100 - cropArea.size)
                  );
                  const newY = Math.max(
                    0,
                    Math.min(percentY - cropArea.size / 2, 100 - cropArea.size)
                  );

                  setCropArea((prev) => ({ ...prev, x: newX, y: newY }));
                }
              }
            }}
          >
            {imageSrc ? (
              <img
                ref={imageRef}
                src={imageSrc}
                alt="크롭할 이미지"
                className="max-w-full max-h-full object-contain"
                onLoad={handleImageLoad}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                이미지를 선택해주세요
              </div>
            )}
            {imageSrc && imageLoaded && (
              <>
                <div
                  className="absolute border-2 border-blue-500 pointer-events-auto cursor-move"
                  style={{
                    left: `${cropArea.x}%`,
                    top: `${cropArea.y}%`,
                    width: `${cropArea.size}%`,
                    height: `${cropArea.size}%`,
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                />
                {/* 크기 조절 핸들 */}
                <div
                  className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-se-resize"
                  style={{
                    left: `${cropArea.x + cropArea.size}%`,
                    top: `${cropArea.y + cropArea.size}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    const startSize = cropArea.size;
                    const startX = e.clientX;
                    const startY = e.clientY;

                    const handleResize = (e: MouseEvent) => {
                      const deltaX = e.clientX - startX;
                      const deltaY = e.clientY - startY;
                      const delta = Math.max(deltaX, deltaY);
                      const newSize = Math.max(
                        20,
                        Math.min(100, startSize + delta / 5)
                      );
                      setCropArea((prev) => ({ ...prev, size: newSize }));
                    };

                    const handleMouseUp = () => {
                      document.removeEventListener("mousemove", handleResize);
                      document.removeEventListener("mouseup", handleMouseUp);
                    };

                    document.addEventListener("mousemove", handleResize);
                    document.addEventListener("mouseup", handleMouseUp);
                  }}
                />
              </>
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
