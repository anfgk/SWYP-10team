import MyReviewList from "./MyReviewList";
import { usePhotoModalStore } from "@/stores/photoModalStore";
import PhotoSlideModal from "../../modals/PhotoSlideModal";
import Pagination from "../../mypage/Pagination";
import { useMyReviewSection } from "@/hooks/useMyReviewSection";

const MyReviewSection = () => {
  const { isOpen } = usePhotoModalStore();
  const { loading, reviews, page, totalPages, hasNext, hasPrevious, setPage } =
    useMyReviewSection();

  return (
    <section className="w-full h-fit flex flex-col gap-[44px] justify-center">
      {loading ? (
        <p>불러오는 중...</p>
      ) : reviews.length === 0 ? (
        <p className="mt-[10px] text-center text-gray-500">
          작성된 리뷰가 없습니다.
        </p>
      ) : (
        <MyReviewList reviews={reviews} />
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          onPageChange={setPage}
        />
      )}

      {isOpen && <PhotoSlideModal />}
    </section>
  );
};

export default MyReviewSection;
