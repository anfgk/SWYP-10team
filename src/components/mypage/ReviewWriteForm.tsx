import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageButton from "../ui/page-button";
import StarRating from "./StarRating";
import ReviewForm from "../ui/review-form";

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
      <div className="text-2xl font-bold mb-8">
        {isEditMode ? "리뷰수정" : "리뷰작성"}
      </div>

      <div className="flex items-center gap-8 mb-8">
        <div className="w-32 h-32 bg-[var(--sidebar-ring)]" />
        <div>
          <div className="text-xl font-semibold mb-2">
            {reviewData?.place || "숙소 이름"}
          </div>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>
      </div>

      <ReviewForm reviewText={reviewText} onReviewChange={setReviewText} />

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="font-semibold">사진첨부</div>
          <PageButton
            text="사진첨부하기"
            onClick={() => fileInputRef.current?.click()}
          />
          <span>{selectedFiles.length}/3</span>
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
          <div className="grid grid-cols-5 gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`첨부파일 ${index + 1}`}
                  className="w-full h-24 object-contain rounded border bg-gray-100"
                />
                <button
                  onClick={() =>
                    setSelectedFiles((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <PageButton text="저장" variant="default" onClick={handleSubmit} />
        <PageButton
          text="취소"
          variant="default"
          onClick={() => navigate("/myreview")}
        />
      </div>
    </main>
  );
};

export default ReviewWriteForm;
