import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/mypage/Sidebar";
import PageButton from "../components/ui/page-button";
import StarRating from "../components/mypage/StarRating";
import ReviewForm from "../components/ui/review-form";

const sidebarMenus = ["내 정보", "최근 본/찜한 장소", "방문한 장소 및 리뷰"];

const ReviewWrite = () => {
  const location = useLocation();
  const reviewData = location.state?.reviewData;
  const isEditMode = !!reviewData;

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [rating, setRating] = useState(reviewData?.rating || 0);
  const [reviewText, setReviewText] = useState(reviewData?.review || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      if (selectedFiles.length + newFiles.length <= 10) {
        setSelectedFiles([...selectedFiles, ...newFiles]);
      } else {
        alert("최대 3개까지만 첨부 가능합니다.");
      }
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleMenuClick = (menu: string) => {
    if (menu === "방문한 장소 및 리뷰") {
      navigate("/myreview");
    }
  };

  const handleSubmit = () => {
    // 리뷰 텍스트가 비어있으면 저장하지 않음
    if (!reviewText.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    // 현재 리뷰 데이터 준비
    const currentReviewData = {
      id: reviewData?.id || Date.now(),
      place: reviewData?.place || "장소명",
      review: reviewText,
      rating: rating,
      hasReview: true,
      images: selectedFiles.length,
      createdAt: new Date().toISOString(),
    };

    // localStorage에서 기존 리뷰 목록 가져오기
    let existingReviews = JSON.parse(localStorage.getItem("reviews") || "[]");

    // 같은 ID의 리뷰가 있는지 확인하고 업데이트
    const existingIndex = existingReviews.findIndex(
      (review: any) => review.id === currentReviewData.id
    );

    if (existingIndex !== -1) {
      // 기존 리뷰 업데이트
      existingReviews[existingIndex] = currentReviewData;
    } else {
      // 새 리뷰 추가
      existingReviews.push(currentReviewData);
    }

    // localStorage에 저장
    localStorage.setItem("reviews", JSON.stringify(existingReviews));

    // 디버깅용 콘솔 로그
    console.log("저장된 리뷰:", currentReviewData);
    console.log("전체 리뷰 목록:", existingReviews);

    // MyReview 페이지로 이동
    navigate("/myreview");
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        menus={sidebarMenus}
        activeMenu="방문한 장소 및 리뷰"
        onMenuClick={handleMenuClick}
      />
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
                    onClick={() => removeFile(index)}
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
          <PageButton
            text={isEditMode ? "저장" : "저장"}
            variant="default"
            onClick={handleSubmit}
          />
          <PageButton
            text="취소"
            variant="default"
            onClick={() => navigate("/myreview")}
          />
        </div>
      </main>
    </div>
  );
};

export default ReviewWrite;
