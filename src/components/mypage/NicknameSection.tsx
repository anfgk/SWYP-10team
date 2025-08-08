import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import PageButton from "@/components/ui/page-button";
import { updateUserProfile } from "@/lib/fetchUtils";

const NicknameSection = () => {
  const { user, setUser, accessToken } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [savedNickname, setSavedNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNickname(user?.name || "");
    setSavedNickname(user?.name || "");
  }, [user?.name]);

  const saveNickname = async () => {
    if (!accessToken || !user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!nickname.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);

      // 기본 이미지 파일 생성 (기존 이미지 유지)
      const defaultImageBlob = new Blob([], { type: "image/jpeg" });
      const defaultImageFile = new File(
        [defaultImageBlob],
        "default-image.jpg",
        {
          type: "image/jpeg",
        }
      );

      // API를 통해 사용자 정보 수정
      const result = await updateUserProfile(
        accessToken,
        nickname.trim(),
        defaultImageFile
      );

      // 성공 시 로컬 상태 업데이트
      setUser({
        name: nickname.trim(),
        email: user.email,
        profileImage: user.profileImage, // 기존 이미지 유지
      });
      setSavedNickname(nickname.trim());
      setIsEditing(false);

      alert("이름이 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("이름 변경 실패:", error);
      alert("이름 변경에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
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
                text={isLoading ? "저장 중..." : "저장"}
                variant="default"
                onClick={isLoading ? undefined : saveNickname}
              />
              <PageButton
                text="취소"
                variant="default"
                onClick={
                  isLoading
                    ? undefined
                    : () => {
                        setNickname(savedNickname);
                        setIsEditing(false);
                      }
                }
              />
            </div>
          ) : (
            <PageButton
              text="변경하기"
              variant="default"
              onClick={() => {
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
