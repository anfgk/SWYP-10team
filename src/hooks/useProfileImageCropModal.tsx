import { useEffect, useRef, useState } from "react";
import type { ReactCropperElement } from "react-cropper";

interface Props {
  currentImage?: string;
}
const useProfileImageCropModal = ({ currentImage }: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [imageURL, setImageURL] = useState<string>(""); // 원본 미리보기용
  const [croppedFile, setCroppedFile] = useState<File | null>(null); // ⬅️ 크롭 결과
  const [previewURL, setPreviewURL] = useState<string>(""); // ⬅️ 크롭 결과 미리보기용

  useEffect(() => {
    if (currentImage) setImageURL(currentImage);
    return () => {
      if (imageURL.startsWith("blob:")) URL.revokeObjectURL(imageURL);
      if (previewURL.startsWith("blob:")) URL.revokeObjectURL(previewURL);
    };
  }, []);

  // 크롭 결과 파일이 바뀔 때마다 미리보기 URL 갱신
  useEffect(() => {
    if (previewURL.startsWith("blob:")) URL.revokeObjectURL(previewURL);
    if (croppedFile) {
      const url = URL.createObjectURL(croppedFile);
      setPreviewURL(url);
    } else {
      setPreviewURL("");
    }
  }, [croppedFile]);

  const handlePick = () => inputRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (imageURL.startsWith("blob:")) URL.revokeObjectURL(imageURL);
    const url = URL.createObjectURL(f);
    setImageURL(url);
    setCroppedFile(null); // 새 파일 선택 시 이전 크롭 결과 초기화
    e.currentTarget.value = ""; // 같은 파일 재선택 가능
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper || !imageURL) return;

    const canvas = cropper.getCroppedCanvas({
      width: 300,
      height: 300,
      imageSmoothingQuality: "high",
    });

    if (!canvas) {
      alert("이미지를 크롭할 수 없습니다. 다른 이미지를 시도해 주세요.");
      return;
    }

    // dataURL 대신 Blob/File로 받기
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          alert("이미지 변환에 실패했습니다.");
          return;
        }
        const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
        setCroppedFile(file);
      },
      "image/jpeg",
      0.9
    );
  };

  return {
    inputRef,
    onFileChange,
    imageURL,
    handlePick,
    cropperRef,
    previewURL,
    croppedFile,
    handleCrop,
  };
};

export { useProfileImageCropModal };
