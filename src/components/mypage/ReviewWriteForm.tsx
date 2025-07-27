import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageButton from "../ui/page-button";
import StarRating from "./StarRating";

const ReviewWriteForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reviewData = location.state?.reviewData;
  const isEditMode = !!reviewData;

  console.log("ReviewWriteForm - reviewData:", reviewData);
  console.log("ReviewWriteForm - isEditMode:", isEditMode);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [rating, setRating] = useState(reviewData?.rating || 0);
  const [reviewText, setReviewText] = useState(reviewData?.review || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      if (selectedFiles.length + newFiles.length <= 3) {
        setSelectedFiles([...selectedFiles, ...newFiles]);
      } else {
        alert("최대 3개까지만 첨부 가능합니다.");
      }
    }
  };

  const handleSubmit = () => {
    if (!reviewText.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    // 이미지 파일들을 base64로 변환
    const convertFilesToBase64 = async (files: File[]) => {
      const base64Promises = files.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });
      return Promise.all(base64Promises);
    };

    // 비동기 처리를 위해 즉시 실행 함수 사용
    (async () => {
      const imageBase64s = await convertFilesToBase64(selectedFiles);

      const currentReviewData = {
        id: reviewData?.id || Date.now(),
        place: reviewData?.place || "장소명",
        review: reviewText,
        rating: rating,
        hasReview: true,
        images: selectedFiles.length,
        imageBase64s: imageBase64s, // base64 이미지 데이터 추가
        createdAt: new Date().toISOString(),
      };

      let existingReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
      const existingIndex = existingReviews.findIndex(
        (review: any) => review.id === currentReviewData.id
      );

      if (existingIndex !== -1) {
        existingReviews[existingIndex] = currentReviewData;
      } else {
        existingReviews.push(currentReviewData);
      }

      localStorage.setItem("reviews", JSON.stringify(existingReviews));
      navigate("/myreview");
    })();
  };

  return (
    <main className="flex-1 px-16 py-12">
      {/* 방문한 장소 및 별점 섹션 */}
      <div className="flex flex-col text-[20px] gap-[9px]">
        <div className="flex font-medium gap-[44px] items-center">
          <span>방문한 장소</span>
          <span>{reviewData?.place || "장소명"}</span>
          <div className="flex gap-2 ml-auto">
            <PageButton
              text="수정하기"
              variant="default"
              onClick={() =>
                navigate("/reviewwrite", { state: { reviewData: reviewData } })
              }
            />
            <PageButton
              text="삭제하기"
              variant="default"
              onClick={() => {
                if (window.confirm("리뷰를 삭제하시겠습니까?")) {
                  // 삭제 로직
                  navigate("/myreview");
                }
              }}
            />
          </div>
        </div>
        <div className="flex mb-[9px]">
          <span className="w-[135px] text-[20px] font-medium">상세 리뷰</span>
          <div className="flex flex-col gap-[9px]">
            <StarRating rating={rating} onRatingChange={setRating} />
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="리뷰를 작성해주세요."
              className="w-[756px] h-[141px] text-[16px] p-4 border border-gray-300 rounded-lg resize-none focus:outline-none mb-[72px]"
            />
          </div>
        </div>
      </div>

      {/* 사진 첨부 섹션 */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-[24px]">
          <div className="font-medium mr-[50px] text-[20px]">사진첨부</div>
          <PageButton
            text="사진 첨부하기"
            onClick={() => fileInputRef.current?.click()}
          />
          <span className="text-gray-600">{selectedFiles.length}/3</span>
          <div className="flex gap-4 ml-auto">
            <PageButton
              text="저장하기"
              variant="default"
              onClick={handleSubmit}
            />
            <PageButton
              text="취소하기"
              variant="default"
              onClick={() => navigate("/myreview")}
            />
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept="image/*"
          className="hidden"
        />
        {selectedFiles.length > 0 && (
          <div className="flex gap-[16px]">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`첨부파일 ${index + 1}`}
                  className="w-[212px] h-[141px] object-cover rounded-lg"
                />
                <button
                  onClick={() =>
                    setSelectedFiles((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                  className="absolute -top-2 -right-[11px] bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ReviewWriteForm;
