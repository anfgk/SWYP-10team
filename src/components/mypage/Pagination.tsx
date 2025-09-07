interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrevious,
}: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-[2px] text-[14px] h-[36px]">
      <button
        className={`w-[24px] h-[24px] ${hasPrevious ? "cursor-pointer" : ""}`}
        onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
      >
        <img
          src="/assets/buttons/button_photo_left.png"
          alt="left"
          className="w-full h-full"
        />
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <span
          key={i}
          className={`w-[23px] h-[36px] flex justify-center items-center cursor-pointer ${currentPage === i ? "text-[var(--text-color)] underline underline-offset-4 decoration-[2px]" : ""}`}
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </span>
      ))}
      <button
        className={`w-[24px] h-[24px] ${hasNext ? "cursor-pointer" : ""}`}
        onClick={() =>
          currentPage < totalPages - 1 && onPageChange(currentPage + 1)
        }
      >
        <img
          src="/assets/buttons/button_photo_right.png"
          alt="right"
          className="w-full h-full"
        />
      </button>
    </div>
  );
};

export default Pagination;
