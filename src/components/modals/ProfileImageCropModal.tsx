import { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import type { ReactCropperElement } from "react-cropper";
import "@/styles/ImageCropModal.css";
import ModalBackground from "./common/ModalBackground";
import DefaultButtonCancel from "../common/DefaultButtonCancel";
import { useModalEscapeKey } from "@/hooks/useModalEscapeKey";
import DefaultButtonConfirm from "../common/DefaultButtonConfirm";
import { changeProfileImage } from "@/lib/myInfoUtils";

interface Props {
  onClose: () => void;
  currentImage?: string;
}

export default function ProfileImageCropModal({
  onClose,
  currentImage,
}: Props) {
  const cropperRef = useRef<ReactCropperElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [imageURL, setImageURL] = useState<string>(""); // 원본 미리보기용
  const [croppedFile, setCroppedFile] = useState<File | null>(null); // ⬅️ 크롭 결과
  const [previewURL, setPreviewURL] = useState<string>(""); // ⬅️ 크롭 결과 미리보기용

  useModalEscapeKey(onClose);

  useEffect(() => {
    if (currentImage) setImageURL(currentImage);
    return () => {
      if (imageURL.startsWith("blob:")) URL.revokeObjectURL(imageURL);
      if (previewURL.startsWith("blob:")) URL.revokeObjectURL(previewURL);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    // ⬇️ dataURL 대신 Blob/File로 받기
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

  return (
    <ModalBackground onClose={onClose}>
      <div
        className="bg-white p-[24px] rounded-[24px] w-[900px] min-h-[600px]"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0px 0px 1px 0px rgba(0, 0, 0, 0.08),
            0px 1px 4px 0px rgba(0, 0, 0, 0.08),
            0px 2px 8px 0px rgba(0, 0, 0, 0.12)`,
        }}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[20px] font-semibold">프로필 이미지 편집</h3>
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
              id="profile-image-upload"
            />
            <DefaultButtonCancel
              w={100}
              h={30}
              text={imageURL ? "이미지 다시 선택" : "이미지 선택"}
              textSize={13}
              onClick={handlePick}
            />
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          이미지를 정사각형으로 잘라주세요.
        </p>

        {/* 본문 - 크롭 영역 */}
        <div className="mb-4">
          {imageURL ? (
            <Cropper
              src={imageURL}
              style={{ height: 400, width: "100%" }}
              aspectRatio={1}
              viewMode={2}
              guides={false}
              background={false}
              autoCropArea={0.8}
              cropBoxResizable
              cropBoxMovable
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

        {/* 크롭 결과 미리보기 */}
        {previewURL && (
          <div className="mb-4 flex items-center gap-4">
            <img
              src={previewURL}
              alt="크롭 결과 미리보기"
              className="w-24 h-24 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">
              변경하기 버튼으로 저장해주세요.
            </span>
          </div>
        )}

        {/* 푸터 */}
        <div className="flex gap-2 justify-end">
          <DefaultButtonConfirm
            w={77}
            h={36}
            text="변경하기"
            textSize={14}
            onClick={() => {
              if (!croppedFile) return;
              // changeProfileImage가 string을 받던 함수였다면, 여기서 FormData로 업로드하도록 그 함수 시그니처를 바꿔줘.
              // 예: changeProfileImage(croppedFile, user?.name!)
              changeProfileImage(croppedFile);
            }}
            isActive={!!croppedFile}
          />
          {imageURL && (
            <DefaultButtonCancel
              w={77}
              h={36}
              text="크롭하기"
              textSize={14}
              onClick={handleCrop}
            />
          )}
          <DefaultButtonCancel
            w={77}
            h={36}
            text="취소하기"
            textSize={14}
            onClick={onClose}
          />
        </div>
      </div>
    </ModalBackground>
  );
}
