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

export { copyCurrentUrl };
