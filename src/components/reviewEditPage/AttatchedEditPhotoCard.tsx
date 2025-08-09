import type { MixedImage } from "@/types/forFrontTypes";
import MainCard from "../mainPage/MainCard";
import { isResponseImage } from "@/lib/reviewWriteUtils";
interface Props {
  onXClick: () => void;
  img: MixedImage;
}
const AttatchedEditPhotoCard = ({ img, onXClick }: Props) => {
  const imageUrl = isResponseImage(img)
    ? img.imageUrl
    : URL.createObjectURL(img);
  return (
    <div className="w-[212px] h-[141px] relative">
      <MainCard className={`w-full h-full`}>
        <img
          src={imageUrl ?? "/assets/images/common/default_thumbnail.png"}
          className="w-full h-full object-cover object-center"
        />
      </MainCard>
      <button
        className="absolute top-[11px] left-[171px] w-[24px] h-[24px] cursor-pointer"
        onClick={onXClick}
      >
        <img
          className="w-full h-full"
          src="/assets/buttons/modal_close.png"
          alt="close button"
        />
      </button>
    </div>
  );
};

export default AttatchedEditPhotoCard;
