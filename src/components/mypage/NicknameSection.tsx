import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import PageButton from "@/components/ui/page-button";
import InputField from "@/components/ui/input-field";

const NicknameSection = () => {
  const { user, setAuth } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [originalName, setOriginalName] = useState(user?.name || "이름");
  const [savedNickname, setSavedNickname] = useState("");

  // 컴포넌트 마운트 시에만 원래 이름 설정 (한 번만)
  useEffect(() => {
    if (user?.name && !originalName) {
      setOriginalName(user.name);
    }
    setNickname(user?.name || "");
    setSavedNickname(user?.name || "");
  }, [user?.name, originalName]);

  const handleSave = () => {
    if (nickname.trim()) {
      setAuth(user?.email || "", {
        name: nickname.trim(),
        email: user?.email || "",
      });
      setSavedNickname(nickname.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNickname(savedNickname);
    setIsEditing(false);
  };

  const handleEdit = () => {
    // 변경하기 버튼을 누르면 현재 입력된 닉네임을 저장
    if (nickname.trim()) {
      setAuth(user?.email || "", {
        name: nickname.trim(),
        email: user?.email || "",
      });
      setSavedNickname(nickname.trim());
    }
    setIsEditing(true);
  };

  return (
    <div className="flex gap-4 items-center mb-[8px]">
      <section>
        <div className="flex justify-center items-center gap-[39px]">
          <span className="">이름</span>
          {isEditing ? (
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-[420px] h-[36px] border border-[#BFBFBF66]/40 rounded-[8px] px-3 text-sm focus:outline-none focus:border-gray-400"
            />
          ) : (
            <div className="w-[420px] h-[36px] border border-[#BFBFBF66]/40 rounded-[8px] flex items-center text-sm text-gray-500 px-3">
              {savedNickname}
            </div>
          )}

          {isEditing ? (
            <div className="flex gap-2">
              <PageButton text="저장" variant="default" onClick={handleSave} />
              <PageButton
                text="취소"
                variant="default"
                onClick={handleCancel}
              />
            </div>
          ) : (
            <PageButton
              text="변경하기"
              variant="default"
              onClick={handleEdit}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default NicknameSection;
