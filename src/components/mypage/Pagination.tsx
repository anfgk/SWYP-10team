import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
    <div className="flex justify-center gap-[2px] text-[14px] h-[36px]">
      <span
        className={`${hasPrevious ? "flex items-center justify-center cursor-pointer text-[var(--card-subText)]" : ""}
          ${currentPage === 0 ? "flex items-center justify-center text-[var(--card-subText)]" : ""}`}
        onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
      >
        <IoIosArrowBack className="w-[24px] h-[24px]" />
      </span>
      {Array.from({ length: totalPages }, (_, i) => (
        <span
          key={i}
          className={`p-[8px] cursor-pointer ${currentPage === i ? "text-[var(--text-color)] underline underline-offset-4 decoration-2" : ""}`}
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </span>
      ))}
      <span
        className={`
          ${hasNext ? "flex items-center justify-center cursor-pointer text-[var(--card-subText)]" : ""}
          ${currentPage === totalPages - 1 ? "flex items-center justify-center cursor-pointer text-[var(--card-subText)] text-[var(--card-subText)]" : ""}`}
        onClick={() =>
          currentPage < totalPages - 1 && onPageChange(currentPage + 1)
        }
      >
        <IoIosArrowForward className="w-[24px] h-[24px]" />
      </span>
    </div>
  );
};

export default Pagination;
