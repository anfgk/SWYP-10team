import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import PageButton from "@/components/ui/page-button";

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
        <section>
          <div className="flex justify-center items-center gap-10">
            이름
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-[420px] h-[36px] border border-[#BFBFBF66]/40 rounded-[8px] flex items-center text-sm text-gray-500 pl-[12px]"
            />
            <div className="flex gap-2">
              <PageButton text="저장" variant="default" onClick={handleSave} />
              <PageButton
                text="취소"
                variant="default"
                onClick={handleCancel}
              />
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className="flex justify-center items-center gap-10">
            이름
            <div className="w-[420px] h-[36px] border border-[#BFBFBF66]/40 rounded-[8px] flex items-center text-sm text-gray-500 pl-[12px] bg-gray-50">
              {user?.name || "닉네임을 설정해주세요"}
            </div>
            <PageButton
              text="변경하기"
              variant="default"
              onClick={() => setIsEditing(true)}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default NicknameSection;
