import { useState } from "react";
import { fetchWithAuth } from "@/lib/fetchUtils";

interface Props {
  onClose: () => void;
  reviewId: number;
}
const useReportModal = ({ reviewId, onClose }: Props) => {
  const [selected, setSelected] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const toggleReason = (id: number) => {
    setSelected(id);
  };

  const handleSubmit = async () => {
    if (submitting) return;

    try {
      setSubmitting(true);

      const params = new URLSearchParams();
      params.append("reasonId", String(selected));
      console.log(params.toString());

      const res = await fetchWithAuth(`/api/review/report/${reviewId}`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (res.ok) {
        alert("신고가 접수되었습니다");
        onClose();
      }

      if (res.status === 400) {
        alert(
          "자기 자신이 작성한 리뷰 / 이미 신고한 리뷰는 신고할 수 없습니다.",
        );
        onClose();
        return;
      }

      if (res.status === 404) {
        alert("리뷰 또는 유저가 존재하지 않습니다.");
        onClose();
        return;
      }

      const text = await res.text().catch(() => "");
      console.error("신고 요청 실패:", res.status, text);
      alert("신고 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      onClose();
    } catch (e) {
      console.error("신고 처리 중 오류 발생: ", e);
    } finally {
      setSubmitting(false);
    }
  };

  return { selected, handleSubmit, toggleReason };
};

export { useReportModal };
