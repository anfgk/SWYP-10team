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

  // URL에서 contentId 추출 (예: /reviewwrite/123 -> 123)
  const pathSegments = location.pathname.split("/");
  const urlContentId = pathSegments.length > 2 ? pathSegments[2] : null;
  const finalContentId = contentId || urlContentId;

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [rating, setRating] = useState(reviewData?.rating || 0);
  const [reviewText, setReviewText] = useState(reviewData?.review || "");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [placeName, setPlaceName] = useState(reviewData?.place || "장소명");
  const [isLoading, setIsLoading] = useState(false);

  const loadPlaceInfo = async () => {
    if (
      !finalContentId ||
      finalContentId === "reviewwrite" ||
      isNaN(Number(finalContentId))
    ) {
      return;
    }

    try {
      setIsLoading(true);

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

      let placeData = null;

      if (response.ok) {
        const data = await response.json();
        placeData = data?.data || data?.place || data;
      } else {
        // /api/place/{contentId} 실패 시 /api/content/search 시도
        const searchUrl = `${import.meta.env.VITE_API_BASE_URL}api/content/search?contentId=${finalContentId}`;

        const searchResponse = await fetch(searchUrl, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJnbG9yaWEwMjA1MTBAZ21haWwuY29tIiwiZGlzcGxheU5hbWUiOiLsoJXtlZgiLCJpYXQiOjE3NTQzODQ4MDQsImV4cCI6MTc2MjE2MDgwNH0.4WXOk_zOhE8ndDtB3zXfwKNi_1Lapv3Z1-seMIgv8fg`,
          },
        });

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
      if (placeData && placeData.name) {
        setPlaceName(placeData.name);
      } else if (placeData && placeData.title) {
        setPlaceName(placeData.title);
      } else {
        setPlaceName("장소명");
      }
    } catch (error) {
      console.error("장소 정보 로드 중 오류:", error);
      setPlaceName("장소명");
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 장소 정보 로드
  useEffect(() => {
    loadPlaceInfo();
  }, [finalContentId]);

  const handleSaveReview = async () => {
    // 필수 파라미터 검증
    if (!reviewText.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    if (!finalContentId) {
      alert("장소 정보를 찾을 수 없습니다.");
      return;
    }

    if (rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }

    try {
      // API 스펙에 맞게 URL 파라미터 구성
      const url = new URL(
        `${import.meta.env.VITE_API_BASE_URL}api/review/${finalContentId}`
      );
      url.searchParams.append("score", rating.toString());
      url.searchParams.append("content", reviewText.trim());

      // FormData 생성 (이미지만)
      const formData = new FormData();

      // 이미지 파일 추가 (최대 3장)
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

      const data = await response.json();

      alert("리뷰가 성공적으로 저장되었습니다.");
      navigate("/myreview");
    } catch (error) {
      console.error("리뷰 저장 중 오류:", error);
      alert("리뷰 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSubmit = () => {
    // 필수 파라미터 검증
    if (!reviewText.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    if (rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }

    setShowConfirmModal(true);
  };

  const handleCancel = () => {
    navigate("/myreview");
  };

  return (
    <main className="flex-1 px-16 py-12">
      <div className="flex flex-col text-[20px] gap-[9px]">
        <div className="flex font-medium gap-[44px] items-center mb-[44px]">
          <span>방문한 장소</span>
          <span>{isLoading ? "로딩 중..." : placeName}</span>
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
        onCancel={() => setShowCancelModal(true)}
        maxFiles={3}
      />

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleSaveReview}
        title="리뷰를 저장하시겠어요?"
      />

      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancel}
        title="리뷰를 취소하시겠어요?<br/>이 페이지를 나가면 저장되지 않아요."
        confirmText="예"
        cancelText="아니오"
        height="h-[266px]"
      />
    </main>
  );
};

export default ReviewWriteForm;
