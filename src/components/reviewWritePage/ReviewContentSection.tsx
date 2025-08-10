import MenuLabel from "./MenuLabel";
import StarRatingInput from "./StarRatingInput";

interface Props {
  score: number;
  setScore: (score: number) => void;
  content: string;
  setContent: (value: string) => void;
  maxLength: number;
}
const ReveiwContentSection = ({
  score,
  setScore,
  content,
  setContent,
  maxLength,
}: Props) => {
  return (
    <section className="w-full h-[174px] flex gap-[44px]">
      <MenuLabel text="상세 리뷰" />
      {/* 별점 + 리뷰 내용 */}
      <div className="w-[1056px] h-full flex flex-col gap-[9px]">
        <StarRatingInput value={score} onChange={setScore} size={24} />
        <div className="w-full h-[141px]  relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="텍스트를 입력해주세요."
            maxLength={maxLength}
            className="w-full h-full rounded-[16px] px-[18px] py-[14px] border-[1px] border-[var(--textarea-border)] placeholder:text-[var(--indicator-disabled)] placeholder:text-[16px] resize-none focus:outline-none"
          />
          <p className="absolute bottom-[14px] right-[18px] w-fit h-[22px] text-[16px] text-[var(--indicator-disabled)]">
            {content.length}/{maxLength}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReveiwContentSection;
