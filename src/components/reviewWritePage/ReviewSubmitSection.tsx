import DefaultButtonConfirm from "../common/DefaultButtonConfirm";
import DefaultButtonCancel from "../common/DefaultButtonCancel";

interface Props {
  setIsSaveOpen: (is: boolean) => void;
  setIsCancelOpen: (is: boolean) => void;
}

const ReviewSubmitSection = ({ setIsSaveOpen, setIsCancelOpen }: Props) => {
  return (
    <section className="w-full h-[45px] flex gap-[16px] justify-end">
      <DefaultButtonConfirm
        w={103}
        h={45}
        text="저장하기"
        textSize={18}
        onClick={() => setIsSaveOpen(true)}
      />
      <DefaultButtonCancel
        w={103}
        h={45}
        text="취소하기"
        textSize={18}
        onClick={() => setIsCancelOpen(true)}
      />
    </section>
  );
};

export default ReviewSubmitSection;
