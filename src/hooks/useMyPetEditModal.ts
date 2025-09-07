import { fetchWithAuth } from "@/lib/fetchUtils";
import { refetchProfile } from "@/lib/authUtils";
import { useState, useEffect, useRef } from "react";
import type { PetData } from "@/types/apiResponseTypes";
import { hasInvalidChars } from "@/lib/myInfoUtils";

const useMyPetEditModal = (petData: PetData) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(petData.imageUrl);

  const [gender, setGender] = useState(petData.gender);
  const [name, setName] = useState(petData.name);
  const [type, setType] = useState(petData.type);
  const [size, setSize] = useState(petData.size);
  const [birthDay, setBirthDay] = useState(petData.birth);

  useEffect(() => {
    if (!image) return;

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

    if (hasInvalidChars(trimmed)) {
      alert("이름에 특수문자, 공백을 포함할 수 없습니다.");
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
      const res = await fetchWithAuth(`/api/pet/profile/${petData.petId}`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 400) {
          const data = await res.json();
          alert(data.message);
        } else if (res.status === 404) {
          alert("사용자를 찾을 수 없습니다.");
        } else {
          alert("반려동물 정보 수정에 실패했습니다.");
          throw new Error("반려동물 등록 api 실패");
        }
        return;
      }

      alert("수정이 완료되었습니다.");
      await refetchProfile();
    } catch (e) {
      console.log("반려동물 수정 요청 실패: ", e);
    }
  };

  const openPicker = () => fileInputRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    // 용량 체크 (5MB 제한)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (f.size > MAX_SIZE) {
      alert("파일 용량은 5MB 이하여야 합니다.");
      e.currentTarget.value = "";
      return;
    }

    // 이미지 타입만 허용
    if (!f.type.startsWith("image/")) {
      alert("이미지 파일(jpg, jpeg, png)만 선택할 수 있습니다.");
      e.currentTarget.value = "";
      return;
    }

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

export { useMyPetEditModal };
