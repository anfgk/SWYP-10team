import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchWithAuth } from "@/lib/fetchUtils";
import { useAuthStore } from "@/stores/authStore";
import type { MixedImage } from "@/types/forFrontTypes";
import { isResponseImage } from "@/lib/reviewWriteUtils";

const useReviewEdit = (id: string) => {
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(2.5);
  const [content, setContent] = useState("");
  const [images, setImages] = useState<MixedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const { accessToken } = useAuthStore();

  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const MAX_LENGTH = 300;
  const MAX_IMAGES = 3;

  useEffect(() => {
    const fetchReviewDetail = async () => {
      setLoading(true);
      try {
        const res = await fetchWithAuth(`/api/review/${id}`, {
          method: "GET",
        });

        if (res.status === 403) {
          alert("타인의 리뷰에는 접근할 수 없습니다.");
          navigate("/");
          return;
        }

        if (res.status === 404) {
          alert("존재하지 않는 리뷰입니다.");
          navigate("/");
          return;
        }

        if (!res.ok) throw new Error("리뷰 불러오기 실패");

        const data = await res.json();

        if (data.data !== null) {
          setTitle(data.data.contentTitle);
          setContent(data.data.content);
          setScore(data.data.score);
          setImages(data.data.images);
        }

        console.log(data);
      } catch (e) {
        console.error("리뷰 api 에러: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchReviewDetail();
  }, [id, accessToken]);

  const openFilePicker = () => {
    if (images.length >= MAX_IMAGES) {
      alert(`사진은 최대 ${MAX_IMAGES}장까지 첨부할 수 있습니다.`);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const remain = MAX_IMAGES - images.length;
    if (remain <= 0) return;

    // 이미지 파일만 받고 최대 개수 제한
    const valid = files
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, remain);

    setImages((prev) => [...prev, ...valid]);

    // 같은 파일 다시 선택 가능하도록 리셋
    e.target.value = "";
  };

  const removeImageByIndex = async (i: number) => {
    const target = images[i];

    if (isResponseImage(target)) {
      // 현재 인덱스의 이미지가 ResponseImage 자료형이라면
      try {
        const res = await fetchWithAuth(
          `/api/review/${id}/image/${target.imageId}`,
          { method: "DELETE" }
        );

        if (!res.ok) {
          throw new Error("이미지 삭제 api 요청 실패");
        }

        setImages((prev) => prev.filter((_, idx) => idx !== i));
      } catch (e) {
        console.error("이미지 삭제 실패");
      }
    } else {
      setImages((prev) => prev.filter((_, idx) => idx !== i));
    }
  };

  return {
    title,
    score,
    content,
    images,
    fileInputRef,
    loading,
    isSaveOpen,
    isCancelOpen,
    MAX_IMAGES,
    MAX_LENGTH,
    navigate,
    setScore,
    setContent,
    setIsSaveOpen,
    setIsCancelOpen,
    openFilePicker,
    handleFilesChange,
    removeImageByIndex,
  };
};

export { useReviewEdit };
