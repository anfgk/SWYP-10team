import Cropper from "react-cropper";
import "@/styles/ImageCropModal.css";
import ModalBackground from "./common/ModalBackground";
import DefaultButtonCancel from "../common/DefaultButtonCancel";
import { useModalEscapeKey } from "@/hooks/useModalEscapeKey";
import DefaultButtonConfirm from "../common/DefaultButtonConfirm";
import { changeProfileImage } from "@/lib/myInfoUtils";
import { useProfileImageCropModal } from "@/hooks/useProfileImageCropModal";

interface Props {
  onClose: () => void;
  currentImage?: string;
}

export default function ProfileImageCropModal({
  onClose,
  currentImage,
}: Props) {
  useModalEscapeKey(onClose);
  const {
    inputRef,
    onFileChange,
    imageURL,
    handlePick,
    cropperRef,
    previewURL,
    croppedFile,
    handleCrop,
  } = useProfileImageCropModal({ currentImage });
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
