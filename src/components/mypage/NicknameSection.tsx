import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import PageButton from "@/components/ui/page-button";
import InputField from "@/components/ui/input-field";

const NicknameSection = () => {
  const { user, setAuth } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(user?.name || "");

  const handleSave = () => {
    if (nickname.trim()) {
      setAuth(user?.email || "", {
        name: nickname.trim(),
        email: user?.email || "",
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNickname(user?.name || "");
    setIsEditing(false);
  };

  return (
    <div className="flex gap-4 items-center mb-[8px]">
      {isEditing ? (
        <>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-70 h-6 bg-white border border-gray-300 px-2 text-sm text-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="닉네임을 입력하세요"
          />
          <div className="flex gap-2">
            <PageButton text="저장" variant="default" onClick={handleSave} />
            <PageButton text="취소" variant="default" onClick={handleCancel} />
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center gap-9">
            {user?.name || "이름"}
            <InputField />
          </div>
          <PageButton
            text="변경하기"
            variant="default"
            onClick={() => setIsEditing(true)}
          />
        </>
      )}
    </div>
  );
};

export default NicknameSection;
