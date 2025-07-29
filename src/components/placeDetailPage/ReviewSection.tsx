interface Props {
  reviewCount: number;
  photos: string[];
}
const ReviewPhotoSection = ({ reviewCount, photos }: Props) => {
  return (
    <section className="w-full h-[215px] flex flex-col gap-[24px] border-t-[1px] border-[var(--search-element-border)] pt-[8px]">
      {/* 전체 리뷰 갯수 */}
      <div className="w-fit h-[32px] flex gap-[8px] items-center">
        <h2 className="text-[20px] font-semibold">리뷰</h2>
        <p className="text-[14px]">({reviewCount}건)</p>
      </div>
      {/* 리뷰 사진 모음 */}
    </section>
  );
};

export default ReviewPhotoSection;
