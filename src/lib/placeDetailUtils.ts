import { toast } from "sonner";

const copyCurrentUrl = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      toast.message("링크 복사 완료!");
    })
    .catch(() => {
      toast.message("링크 복사 실패!");
    });
};

const formatDateToString = (date: Date) => {
  const formatted = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return formatted;
};

export { copyCurrentUrl, formatDateToString };
