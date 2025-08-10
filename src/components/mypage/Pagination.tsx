interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
  setPage: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrevious,
}: PaginationProps) => {
  return (
    <div className="flex justify-center mt-16 gap-2 text-lg">
      <span
        className={`${hasPrevious ? "cursor-pointer text-[var(--card-subText)]" : ""}
          ${currentPage === 0 ? "text-[var(--card-subText)]" : ""}`}
        onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
      >
        &#60;
      </span>
      {Array.from({ length: totalPages }, (_, i) => (
        <span
          key={i}
          className={`mx-1 cursor-pointer ${currentPage === i ? "text-[var(--text-color)]" : ""}`}
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </span>
      ))}
      <span
        className={`
          ${hasNext ? "cursor-pointer text-[var(--card-subText)]" : ""}
          ${currentPage === totalPages - 1 ? "text-[var(--card-subText)]" : ""}`}
        onClick={() =>
          currentPage < totalPages - 1 && onPageChange(currentPage + 1)
        }
      >
        &#62;
      </span>
    </div>
  );
};

export default Pagination;
