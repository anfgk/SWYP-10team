import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex justify-center mt-16 gap-2 text-lg">
      <span
        className={`cursor-pointer ${currentPage === 1 ? "text-gray-400" : ""}`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        &#60;
      </span>
      {Array.from({ length: totalPages }, (_, i) => (
        <span
          key={i + 1}
          className={`mx-1 cursor-pointer ${currentPage === i + 1 ? "font-bold underline" : ""}`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </span>
      ))}
      <span
        className={`cursor-pointer ${currentPage === totalPages ? "text-gray-400" : ""}`}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      >
        &#62;
      </span>
    </div>
  );
};

export default Pagination;
