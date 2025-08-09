import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchWithoutAuth } from "@/lib/fetchUtils";

const useReviewWrite = (id: string) => {
  const [title, setTitle] = useState("");
  const [score, setScore] = useState(2.5);
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const MAX_LENGTH = 300;
  const MAX_IMAGES = 3;

  useEffect(() => {
    const fetchPlaceDetail = async () => {
      setLoading(true);
      try {
        const res = await fetchWithoutAuth(
          `/api/content/placedetail?contentId=${id}`,
          {
            method: "GET",
          }
        );
        if (!res.ok) throw new Error("장소 정보 불러오기 실패");
        const data = await res.json();
        setTitle(data.title);
        console.log(data);
      } catch (e) {
        console.error("장소 api 에러: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaceDetail();
  }, [id]);

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

  const removeImageByIndex = (i: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
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

export { useReviewWrite };
