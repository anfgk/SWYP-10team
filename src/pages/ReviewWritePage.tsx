import { useParams } from "react-router-dom";
import { useReviewWrite } from "@/hooks/useReviewWrite";

import { writeReview } from "@/lib/reviewWriteUtils";

import MainContainer from "@/components/layout/MainContainer";
import ReviewSaveModal from "@/components/modals/ReviewSaveModal";
import ReviewCancelModal from "@/components/modals/ReviewCancelModal";

import ReveiwContentSection from "@/components/reviewWritePage/ReviewContentSection";
import ReviewTitleSection from "@/components/reviewWritePage/ReviewTitleSection";
import ReviewPhotoAttatchSection from "@/components/reviewWritePage/ReviewPhotoAttatchSection";
import ReviewSubmitSection from "@/components/reviewWritePage/ReviewSubmitSection";

const ReviewWritePage = () => {
  const { id } = useParams();
  const {
    title,
    score,
    content,
    images,
    loading,
    fileInputRef,
    isSaveOpen,
    isCancelOpen,
    MAX_IMAGES,
    MAX_LENGTH,
    navigate,
    setScore,
    setContent,
    setIsSaveOpen,
    setIsCancelOpen,
    openFilePicker,
    handleFilesChange,
    removeImageByIndex,
  } = useReviewWrite(id!);

  return (
    <MainContainer>
      <section className="w-full h-[867px] flex flex-col gap-[44px] pt-[96px] pb-[44px]">
        <h1 className="w-[89px] h-[38px] font-semibold text-[24px]">
          리뷰 작성
        </h1>
        {/* 제목 + 리뷰 + 사진 첨부 + 제출 버튼 */}
        {loading ? (
          <p className="text-center text-[14px] text-[var(--place-neutral)] py-8">
            불러오는 중...
          </p>
        ) : (
          <div className="w-full h-[645px] flex flex-col gap-[68px]">
            {/* 제목 + 리뷰 +사진첨부 */}
            <div className="w-full h-[532px] flex flex-col gap-[72px]">
              {/* 제목 + 리뷰 */}
              <div className="w-full h-[250px] flex flex-col gap-[44px]">
                {/* 제목 */}
                <ReviewTitleSection title={title} />
                {/* 리뷰 작성 섹션 */}
                <ReveiwContentSection
                  score={score}
                  setScore={setScore}
                  content={content}
                  setContent={setContent}
                  maxLength={MAX_LENGTH}
                />
              </div>
              <ReviewPhotoAttatchSection
                images={images}
                maxImages={MAX_IMAGES}
                fileInputRef={fileInputRef}
                openFilePicker={openFilePicker}
                handleFilesChange={handleFilesChange}
                removeImageByIndex={removeImageByIndex}
              />
            </div>
            {/* 버튼 */}
            <ReviewSubmitSection
              setIsSaveOpen={setIsSaveOpen}
              setIsCancelOpen={setIsCancelOpen}
            />
          </div>
        )}

        {/* 모달 */}
        {isSaveOpen && (
          <ReviewSaveModal
            onClose={() => setIsSaveOpen(false)}
            onConfirm={() => {
              writeReview(id!, score, content, images);
              alert("리뷰가 작성되었습니다.");
              navigate(`/placedetail/${id}`);
            }}
          />
        )}
        {isCancelOpen && (
          <ReviewCancelModal
            onClose={() => setIsCancelOpen(false)}
            onConfirm={() => {
              setIsCancelOpen(false);
              navigate(`/placedetail/${id}`);
            }}
          />
        )}
      </section>
    </MainContainer>
  );
};

export default ReviewWritePage;
