import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
  const [cropArea, setCropArea] = useState({ x: 10, y: 10, size: 60 }); // 퍼센트로 설정
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1); // 이미지 줌 레벨
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 }); // 이미지 오프셋
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else if (currentImage && !imageSrc) {
      // currentImage가 있고 아직 imageSrc가 설정되지 않았을 때 설정
      setImageSrc(currentImage);
      setZoom(1);
      setImageOffset({ x: 0, y: 0 });
      setCropArea({ x: 10, y: 10, size: 60 });
    }
  }, [imageFile, currentImage, imageSrc]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
        // 새로운 이미지가 로드되면 줌과 오프셋을 초기화
        setZoom(1);
        setImageOffset({ x: 0, y: 0 });
        setCropArea({ x: 10, y: 10, size: 60 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    console.log("이미지 삭제 버튼 클릭됨");
    console.log("삭제 전 imageSrc:", imageSrc);
    setImageSrc("");
    setZoom(1);
    setImageOffset({ x: 0, y: 0 });
    setCropArea({ x: 10, y: 10, size: 60 });
    // 파일 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    console.log("삭제 후 imageSrc가 빈 문자열로 설정됨");
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current || !imageRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDragging(true);
    setDragStart({ x, y });

    // 클릭한 위치를 퍼센트로 변환 (줌과 오프셋 고려)
    const imgRect = imageRef.current.getBoundingClientRect();
    const adjustedX = (x - imageOffset.x) / zoom;
    const adjustedY = (y - imageOffset.y) / zoom;
    const percentX = (adjustedX / imgRect.width) * 100;
    const percentY = (adjustedY / imgRect.height) * 100;

    // 크롭 영역을 클릭한 위치로 이동 (크롭 영역의 중심이 클릭 위치가 되도록)
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

    // 화면 좌표를 퍼센트로 변환 (줌 고려)
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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    // 마우스 휠로 이미지 줌 조절
    const delta = e.deltaY > 0 ? 0.9 : 1.1; // 휠 방향에 따라 줌 조절
    const newZoom = Math.max(0.1, Math.min(5, zoom * delta)); // 최소 0.1배, 최대 5배

    // 마우스 위치를 중심으로 줌
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

        // 퍼센트를 픽셀로 변환 (줌과 오프셋 고려)
        const sourceX = (cropArea.x / 100) * image.naturalWidth;
        const sourceY = (cropArea.y / 100) * image.naturalHeight;
        const sourceSize =
          (cropArea.size / 100) *
          Math.min(image.naturalWidth, image.naturalHeight);

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

        const croppedImageData = canvas.toDataURL("image/jpeg", 0.8);
        onCrop(croppedImageData);
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
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="sm"
            >
              {imageSrc ? "이미지 변경" : "이미지 선택"}
            </Button>
          </div>
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
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
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
            {/* 크롭 영역 표시 - 200x200 픽셀 고정 */}
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
          <Button onClick={onClose} variant="outline">
            취소
          </Button>
          <Button onClick={handleCrop} disabled={!imageSrc}>
            적용
          </Button>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default ImageCropModal;
