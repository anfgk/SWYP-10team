import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import StarRating from "./StarRating";
import ImageUploadSection from "./ImageUploadSection";
import ConfirmModal from "./ConfirmModal";

const ReviewWriteForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { contentId } = useParams();
  const reviewData = location.state?.reviewData;

  // URL에서 contentId 추출
  const pathSegments = location.pathname.split("/");
  const finalContentId =
    contentId || (pathSegments.length > 2 ? pathSegments[2] : null);

  // 폼 상태 통합 관리
  const [formState, setFormState] = useState({
    rating: reviewData?.rating || 0,
    reviewText: reviewData?.review || "",
    placeName: reviewData?.place || "장소명",
    isLoading: false,
    errors: { rating: "", reviewText: "", placeName: "" },
    isValid: false,
  });

  const [modalState, setModalState] = useState({
    showConfirmModal: false,
    showCancelModal: false,
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // 상태 업데이트 함수들
  const updateFormState = (updates: Partial<typeof formState>) =>
    setFormState((prev) => ({ ...prev, ...updates }));
  const updateErrors = (errors: Partial<typeof formState.errors>) =>
    setFormState((prev) => ({
      ...prev,
      errors: { ...prev.errors, ...errors },
    }));
  const updateModalState = (updates: Partial<typeof modalState>) =>
    setModalState((prev) => ({ ...prev, ...updates }));

  // 유효성 검사
  const validateForm = () => {
    const errors = {
      rating: formState.rating === 0 ? "별점을 선택해주세요." : "",
      reviewText:
        formState.reviewText.trim() === "" ? "리뷰 내용을 입력해주세요." : "",
      placeName:
        formState.placeName === "장소명" ? "장소 정보를 찾을 수 없습니다." : "",
    };
    const isValid = !errors.rating && !errors.reviewText && !errors.placeName;
    updateErrors(errors);
    updateFormState({ isValid });
    return isValid;
  };

  // 장소 정보 로드
  const loadPlaceInfo = async () => {
    if (!finalContentId || isNaN(Number(finalContentId))) return;
    try {
      updateFormState({ isLoading: true });
      let placeData = null;

      // /api/place/{contentId} 시도
      let response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/place/${finalContentId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        placeData = data?.data || data?.place || data;
      } else {
        // /api/content/search 시도
        const searchResponse = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}api/content/search?contentId=${finalContentId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
            },
          },
        );
        if (!searchResponse.ok)
          throw new Error(`검색 API 실패: ${searchResponse.status}`);
        const searchData = await searchResponse.json();
        placeData = searchData?.data || searchData?.content || searchData;
      }

      const newPlaceName = placeData?.name || placeData?.title || "장소명";
      updateFormState({ placeName: newPlaceName });
    } catch (error) {
      console.error("장소 정보 로드 중 오류:", error);
      updateFormState({ placeName: "장소명" });
    } finally {
      updateFormState({ isLoading: false });
    }
  };

  useEffect(() => {
    loadPlaceInfo();
  }, [finalContentId]);

  // 리뷰 저장
  const handleSaveReview = async () => {
    if (!validateForm()) return;
    try {
      updateFormState({ isLoading: true });
      const url = new URL(
        `${import.meta.env.VITE_API_BASE_URL}api/review/${finalContentId}`,
      );
      url.searchParams.append("score", formState.rating.toString());
      url.searchParams.append("content", formState.reviewText.trim());

      const formData = new FormData();
      selectedFiles
        .slice(0, 3)
        .forEach((file) => formData.append("images", file));

      const response = await fetch(url.toString(), {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error(`리뷰 저장 실패: ${response.status}`);
      alert("리뷰가 성공적으로 저장되었습니다.");
      navigate("/myreview");
    } catch (error) {
      console.error("리뷰 저장 중 오류:", error);
      alert("리뷰 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      updateFormState({ isLoading: false });
    }
  };

  // 이벤트 핸들러들
  const handleSubmit = () =>
    validateForm() && updateModalState({ showConfirmModal: true });
  const handleRatingChange = (newRating: number) => {
    updateFormState({ rating: newRating });
    if (formState.errors.rating) updateErrors({ rating: "" });
  };
  const handleReviewTextChange = (text: string) => {
    updateFormState({ reviewText: text });
    if (formState.errors.reviewText) updateErrors({ reviewText: "" });
  };

  return (
    <main className="flex-1 px-16 py-12">
      <div className="flex flex-col text-[20px] gap-[9px]">
        <div className="flex font-medium gap-[44px] items-center mb-[44px]">
          <span>방문한 장소</span>
          <span>
            {formState.isLoading ? "로딩 중..." : formState.placeName}
          </span>
        </div>
        <div className="flex mb-[9px]">
          <span className="w-[135px] text-[20px] font-medium">상세 리뷰</span>
          <div className="flex flex-col gap-[9px]">
            <StarRating
              rating={formState.rating}
              onRatingChange={handleRatingChange}
            />
            {formState.errors.rating && (
              <span className="text-red-500 text-sm">
                {formState.errors.rating}
              </span>
            )}
            <textarea
              value={formState.reviewText}
              onChange={(e) => handleReviewTextChange(e.target.value)}
              placeholder="리뷰를 작성해주세요."
              className="w-[756px] h-[141px] text-[16px] p-4 border border-gray-300 rounded-lg resize-none focus:outline-none mb-[72px]"
            />
            {formState.errors.reviewText && (
              <span className="text-red-500 text-sm">
                {formState.errors.reviewText}
              </span>
            )}
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
        onCancel={() => updateModalState({ showCancelModal: true })}
        maxFiles={3}
      />

      <ConfirmModal
        isOpen={modalState.showConfirmModal}
        onClose={() => updateModalState({ showConfirmModal: false })}
        onConfirm={handleSaveReview}
        title="리뷰를 저장하시겠어요?"
      />

      <ConfirmModal
        isOpen={modalState.showCancelModal}
        onClose={() => updateModalState({ showCancelModal: false })}
        onConfirm={() => navigate("/myreview")}
        title="리뷰를 취소하시겠어요?<br/>이 페이지를 나가면 저장되지 않아요."
        confirmText="예"
        cancelText="아니오"
        height="h-[266px]"
      />
    </main>
  );
};

export default ReviewWriteForm;
