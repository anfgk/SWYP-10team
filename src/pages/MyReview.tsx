import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/mypage/Sidebar";
import ReviewItem from "@/components/mypage/ReviewItem";
import MainContainer from "@/components/MainContainer";

const dummyReviews = [
  { id: 1, place: "장소명", review: "정말 좋은 곳이었어요!", hasReview: true },
  { id: 2, place: "장소명", review: "", hasReview: false },
  { id: 3, place: "장소명", review: "괜찮았습니다.", hasReview: true },
];

const sidebarMenus = ["내 정보", "최근 본/찜한 장소", "방문한 장소 및 리뷰"];

const MyReview = () => {
  const [reviews, setReviews] = useState(dummyReviews);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const navigate = useNavigate();
  const activeMenu = "방문한 장소 및 리뷰";

  // 페이지 로드 시 localStorage에서 리뷰 데이터 불러오기
  useEffect(() => {
    const loadReviews = () => {
      const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
      if (savedReviews.length > 0) {
        console.log("localStorage에서 불러온 리뷰 데이터:", savedReviews);
        setReviews(savedReviews);
      } else {
        console.log("localStorage가 비어있어서 기본 데이터 사용");
        // localStorage가 비어있을 때만 기본 데이터 설정
        localStorage.setItem("reviews", JSON.stringify(dummyReviews));
        setReviews(dummyReviews);
      }
    };
    loadReviews();
  }, []);

  // 페이지 포커스 시 localStorage에서 최신 데이터 다시 불러오기
  useEffect(() => {
    const handleFocus = () => {
      const savedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
      if (savedReviews.length > 0) {
        console.log("포커스 시 불러온 데이터:", savedReviews);
        setReviews(savedReviews);
      }
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setEditText(item.review);
  };

  const handleSaveEdit = (id: number, text: string) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id
          ? { ...review, review: text, hasReview: text.trim() !== "" }
          : review
      )
    );
    setEditingId(null);
    setEditText("");
  };

  const handleDelete = (item: any) => {
    console.log("삭제 시도:", item);

    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      console.log("삭제 확인됨, 현재 리뷰 목록:", reviews);

      // 현재 리뷰 목록에서 해당 리뷰 삭제
      const updatedReviews = reviews.filter((review) => review.id !== item.id);
      console.log("삭제 후 리뷰 목록:", updatedReviews);

      // 상태 업데이트
      setReviews(updatedReviews);

      // localStorage 즉시 업데이트
      localStorage.setItem("reviews", JSON.stringify(updatedReviews));

      // 추가 확인을 위해 localStorage 다시 읽어오기
      const verifyStorage = JSON.parse(localStorage.getItem("reviews") || "[]");
      console.log("localStorage 확인:", verifyStorage);

      console.log("리뷰 삭제 완료:", item.id);
    } else {
      console.log("삭제 취소됨");
    }
  };

  const handleSidebarMenuClick = (menu: string) => {
    if (menu === "내 정보") navigate("/myinfo");
    else if (menu === "최근 본/찜한 장소") navigate("/wish");
    else if (menu === "방문한 장소 및 리뷰") navigate("/myreview");
  };

  return (
    <MainContainer>
      <div className="flex min-h-screen bg-white">
        <Sidebar
          menus={sidebarMenus}
          activeMenu={activeMenu}
          onMenuClick={handleSidebarMenuClick}
        />

        <main className="flex-1 px-16 py-12">
          {/* 브레드크럼 */}
          <div className="text-sm text-gray-600 mb-4">
            메인 &gt; 마이페이지 &gt; 방문한 장소 및 리뷰
          </div>

          {/* 페이지 제목 */}
          <h1 className="text-3xl font-bold text-black mb-8">마이페이지</h1>

          {/* 방문한 장소 섹션 */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-black mb-6">
              방문한 장소
            </h2>

            {reviews.map((item) => (
              <ReviewItem
                key={item.id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSaveEdit={handleSaveEdit}
                editingId={editingId}
                editText={editText}
                setEditText={setEditText}
              />
            ))}
          </div>
        </main>
      </div>
    </MainContainer>
  );
};

export default MyReview;
