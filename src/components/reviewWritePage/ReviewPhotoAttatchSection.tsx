import MenuLabel from "./MenuLabel";
import DefaultButtonConfirm from "../common/DefaultButtonConfirm";
import AttatchedPhotoCard from "./AttatchedPhotoCard";

interface Props {
  images: File[];
  maxImages: number;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  openFilePicker: () => void;
  handleFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImageByIndex: (index: number) => void;
}

const ReviewPhotoAttatchSection = ({
  images,
  maxImages,
  fileInputRef,
  openFilePicker,
  handleFilesChange,
  removeImageByIndex,
}: Props) => {
  return (
    <div className="w-[812px] h-[210px] flex gap-[44px]">
      <MenuLabel text="사진 첨부" />
      {/* 사진 첨부 패널 */}
      <div className="w-[668px] h-[210px] flex flex-col gap-[24px]">
        <div className="w-[184px] h-[45px] flex gap-[24px] items-center">
          <DefaultButtonConfirm
            text="사진 첨부하기"
            w={138}
            h={45}
            textSize={18}
            onClick={openFilePicker}
          />
          <p className="w-fit h-fit text-[14px]">
            {images.length + "/" + maxImages}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFilesChange}
          />
        </div>
        {/* 사진 목록 패널 */}
        <div className="w-[668px] h-[141px] flex gap-[16px]">
          {images.map((image, i) => (
            <AttatchedPhotoCard
              key={i}
              img={image}
              onXClick={() => removeImageByIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewPhotoAttatchSection;
