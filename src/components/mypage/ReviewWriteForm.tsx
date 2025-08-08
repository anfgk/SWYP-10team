import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import StarRating from "./StarRating";
import ImageUploadSection from "./ImageUploadSection";
import ConfirmModal from "./ConfirmModal";

interface FormState {
  rating: number;
  reviewText: string;
  placeName: string;
  isLoading: boolean;
  errors: {
    rating: string;
    reviewText: string;
    placeName: string;
  };
  isValid: boolean;
}

interface ModalState {
  showConfirmModal: boolean;
  showCancelModal: boolean;
}

const ReviewWriteForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { contentId } = useParams();
  const reviewData = location.state?.reviewData;

  // URL에서 contentId 추출
  const pathSegments = location.pathname.split("/");
  const urlContentId = pathSegments.length > 2 ? pathSegments[2] : null;
  const finalContentId = contentId || urlContentId;

  // 폼 상태 통합 관리
  const [formState, setFormState] = useState<FormState>({
    rating: reviewData?.rating || 0,
    reviewText: reviewData?.review || "",
    placeName: reviewData?.place || "장소명",
    isLoading: false,
    errors: {
      rating: "",
      reviewText: "",
      placeName: "",
    },
    isValid: false,
  });

  // 모달 상태 관리
  const [modalState, setModalState] = useState<ModalState>({
    showConfirmModal: false,
    showCancelModal: false,
  });

  // 파일 상태 관리
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // 폼 상태 업데이트 함수
  const updateFormState = (updates: Partial<FormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }));
  };

  // 에러 상태 업데이트 함수
  const updateErrors = (errors: Partial<FormState["errors"]>) => {
    setFormState((prev) => ({
      ...prev,
      errors: { ...prev.errors, ...errors },
    }));
  };

  // 모달 상태 업데이트 함수
  const updateModalState = (updates: Partial<ModalState>) => {
    setModalState((prev) => ({ ...prev, ...updates }));
  };

  // 유효성 검사 함수
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

      // 먼저 /api/place/{contentId} 시도
      let response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}api/place/${finalContentId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        placeData = data?.data || data?.place || data;
      } else {
        // /api/place/{contentId} 실패 시 /api/content/search 시도
        const searchResponse = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}api/content/search?contentId=${finalContentId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
            },
          }
        );

        if (!searchResponse.ok) {
          const errorText = await searchResponse.text();
          console.error("검색 API 에러 응답:", errorText);
          throw new Error(
            `검색 API 실패: ${searchResponse.status} - ${errorText}`
          );
        }

        const searchData = await searchResponse.json();
        placeData = searchData?.data || searchData?.content || searchData;
      }

      // 장소명 설정
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

  // 리뷰 저장 핸들러
  const handleSaveReview = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      updateFormState({ isLoading: true });

      const url = new URL(
        `${import.meta.env.VITE_API_BASE_URL}api/review/${finalContentId}`
      );
      url.searchParams.append("score", formState.rating.toString());
      url.searchParams.append("content", formState.reviewText.trim());

      const formData = new FormData();
      selectedFiles.slice(0, 3).forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch(url.toString(), {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("리뷰 저장 실패:", errorText);
        throw new Error(`리뷰 저장 실패: ${response.status} - ${errorText}`);
      }

      alert("리뷰가 성공적으로 저장되었습니다.");
      navigate("/myreview");
    } catch (error) {
      console.error("리뷰 저장 중 오류:", error);
      alert("리뷰 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      updateFormState({ isLoading: false });
    }
  };

  // 저장 확인 모달 열기
  const handleSubmit = () => {
    if (validateForm()) {
      updateModalState({ showConfirmModal: true });
    }
  };

  // 별점 변경 핸들러
  const handleRatingChange = (newRating: number) => {
    updateFormState({ rating: newRating });
    if (formState.errors.rating) {
      updateErrors({ rating: "" });
    }
  };

  // 리뷰 텍스트 변경 핸들러
  const handleReviewTextChange = (text: string) => {
    updateFormState({ reviewText: text });
    if (formState.errors.reviewText) {
      updateErrors({ reviewText: "" });
    }
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
