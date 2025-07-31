import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StarRating from "./StarRating";
import ImageUploadSection from "./ImageUploadSection";

const ReviewWriteForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reviewData = location.state?.reviewData;

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [rating, setRating] = useState(reviewData?.rating || 0);
  const [reviewText, setReviewText] = useState(reviewData?.review || "");

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

  const handleSubmit = async () => {
    if (!reviewText.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    const imageBase64s = await convertFilesToBase64(selectedFiles);
    const currentReviewData = {
      id: reviewData?.id || Date.now(),
      place: reviewData?.place || "장소명",
      review: reviewText,
      rating: rating,
      hasReview: true,
      images: selectedFiles.length,
      imageBase64s: imageBase64s,
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
  };

  const handleDelete = () => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      navigate("/myreview");
    }
  };

  return (
    <main className="flex-1 px-16 py-12">
      <div className="flex flex-col text-[20px] gap-[9px]">
        <div className="flex font-medium gap-[44px] items-center">
          <span>방문한 장소</span>
          <span>{reviewData?.place || "장소명"}</span>
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

      <ImageUploadSection
        selectedFiles={selectedFiles}
        onFileSelect={setSelectedFiles}
        onFileRemove={(index) =>
          setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
        }
        onSave={handleSubmit}
        onCancel={() => navigate("/myreview")}
        maxFiles={3}
      />
    </main>
  );
};

export default ReviewWriteForm;
