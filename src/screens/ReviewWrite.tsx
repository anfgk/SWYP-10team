import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
import PageButton from "../components/ui/PageButton";

const sidebarMenus = [
  "내 정보",
  "찜한 장소",
  "방문한 장소 및 리뷰",
  "문의내역",
];

const ReviewWrite = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const activeMenu = "방문한 장소 및 리뷰";

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      if (selectedFiles.length + newFiles.length <= 10) {
        setSelectedFiles([...selectedFiles, ...newFiles]);
      } else {
        alert("최대 10개까지만 첨부 가능합니다.");
      }
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const handleMenuClick = (menu: string) => {
    if (menu === "방문한 장소 및 리뷰") {
      navigate("/myreview");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        menus={sidebarMenus}
        activeMenu={activeMenu}
        onMenuClick={handleMenuClick}
      />
      {/* Main Content */}
      <main className="flex-1 px-16 py-12">
        {/* 상단 타이틀 */}
        <div className="text-2xl font-bold mb-8">리뷰작성</div>
        {/* 숙소 정보 */}
        <div className="flex items-center gap-8 mb-8">
          <div className="w-32 h-32 bg-[var(--sidebar-ring)]" />
          <div>
            <div className="text-xl font-semibold mb-2">숙소 이름</div>
            <div className="flex text-2xl gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`cursor-pointer ${i < rating ? "text-yellow-400" : "text-[var(--sidebar-ring)]"}`}
                  onClick={() => handleStarClick(i)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* 상세리뷰 */}
        <div className="mb-8">
          <div className="mb-2 font-semibold">상세리뷰</div>
          <textarea
            className="w-full h-40 p-4 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="리뷰를 작성해주세요..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
        {/* 사진첨부 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="font-semibold">사진첨부</div>
            <PageButton text="사진첨부하기" onClick={handleFileButtonClick} />
            <span>{selectedFiles.length}/10</span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            accept="image/*"
            className="hidden"
          />
          {/* 선택된 파일 목록 */}
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
        {/* 제출 버튼 */}
        <div className="flex justify-end mt-12">
          <PageButton text="제출하기" variant="primary" />
        </div>
      </main>
    </div>
  );
};

export default ReviewWrite;
