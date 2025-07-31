import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import PageButton from "@/components/ui/page-button";

const NicknameSection = () => {
  const { user, setAuth } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [savedNickname, setSavedNickname] = useState("");

  useEffect(() => {
    setNickname(user?.name || "");
    setSavedNickname(user?.name || "");
  }, [user?.name]);

  const saveNickname = () => {
    if (nickname.trim()) {
      setAuth(user?.email || "", {
        name: nickname.trim(),
        email: user?.email || "",
      });
      setSavedNickname(nickname.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="flex gap-4 items-center mb-[8px]">
      <section>
        <div className="flex justify-center items-center gap-[39px]">
          <span>이름</span>
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
              <PageButton
                text="저장"
                variant="default"
                onClick={saveNickname}
              />
              <PageButton
                text="취소"
                variant="default"
                onClick={() => {
                  setNickname(savedNickname);
                  setIsEditing(false);
                }}
              />
            </div>
          ) : (
            <PageButton
              text="변경하기"
              variant="default"
              onClick={() => {
                if (nickname.trim()) {
                  setAuth(user?.email || "", {
                    name: nickname.trim(),
                    email: user?.email || "",
                  });
                  setSavedNickname(nickname.trim());
                }
                setIsEditing(true);
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default NicknameSection;
