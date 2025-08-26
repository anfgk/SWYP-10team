import { fetchWithAuth } from "@/lib/fetchUtils";
import { refetchProfile } from "@/lib/authUtils";
import { useState, useEffect, useRef } from "react";

const useMyPetAddModal = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [gender, setGender] = useState<"F" | "M">("F");
  const [name, setName] = useState("");
  const [type, setType] = useState("강아지");
  const [size, setSize] = useState("소형");
  const [birthDay, setBirthDay] = useState("2025-01-01");

  useEffect(() => {
    if (!image) {
      // 기존 미리보기 정리
      if (previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [image]);

  const handleSubmit = async () => {
    const trimmed = name.trim();

    if (trimmed.length < 1) {
      alert("이름은 한글자 이상이여야 합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("name", trimmed);
    formData.append("gender", gender);
    formData.append("birth", birthDay);
    formData.append("type", type === "강아지(맹견)" ? "강아지" : type);
    formData.append("fierceDog", String(type === "강아지(맹견)"));
    formData.append("size", size);
    if (image) {
      formData.append("image", image);
    }

    try {
      console.log([...formData.entries()]);
      const res = await fetchWithAuth(`/api/pet/profile`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 400) {
          const data = await res.json();
          alert(data.message);
        } else if (res.status === 404) {
          alert("사용자를 찾을 수 없습니다.");
        } else {
          alert("반려동물 등록에 실패했습니다.");
          throw new Error("반려동물 등록 api 실패");
        }
        return;
      }

      alert("등록이 완료되었습니다.");
      await refetchProfile();
    } catch (e) {
      console.log("반려동물 등록 요청 실패: ", e);
    }
  };

  const openPicker = () => fileInputRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setImage(f);
    e.currentTarget.value = "";
  };
  return {
    gender,
    name,
    type,
    size,
    birthDay,
    setGender,
    setName,
    setType,
    setSize,
    setBirthDay,
    fileInputRef,
    previewUrl,
    setPreviewUrl,
    handleSubmit,
    openPicker,
    onFileChange,
  };
};

export { useMyPetAddModal };
