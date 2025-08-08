import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import PageButton from "@/components/ui/page-button";
import { updateUserProfile } from "@/lib/fetchUtils";

const NicknameSection = () => {
  const { user, setUser, accessToken } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(user?.name || "");
  const [isLoading, setIsLoading] = useState(false);

  // 사용자 이름이 변경될 때마다 닉네임 상태 업데이트
  useEffect(() => {
    setNickname(user?.name || "");
  }, [user?.name]);

  // 닉네임 저장 핸들러
  const handleSave = async () => {
    // 유효성 검사: 토큰, 사용자 정보, 닉네임 확인
    if (!accessToken || !user || !nickname.trim()) {
      alert(nickname.trim() ? "로그인이 필요합니다." : "이름을 입력해주세요.");
      return;
    }

    // displayName 유효성 검사 (2-12자, 영문/숫자/한글만 허용)
    if (nickname.trim().length < 2 || nickname.trim().length > 12) {
      alert("이름은 2-12자 사이여야 합니다.");
      return;
    }

    const namePattern = /^[a-zA-Z0-9가-힐]*$/;
    if (!namePattern.test(nickname.trim())) {
      alert("이름은 영문, 숫자, 한글만 사용 가능합니다.");
      return;
    }

    try {
      setIsLoading(true);

      // 닉네임만 변경하는 경우 이미지는 전송하지 않음
      // API가 기존 이미지를 유지하도록 함
      await updateUserProfile(accessToken, nickname.trim());

      // 성공 시 로컬 상태 업데이트
      setUser({
        ...user,
        name: nickname.trim(),
      });
      setIsEditing(false);
      alert("이름이 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("이름 변경 실패:", error);
      alert("이름 변경에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  // 편집 취소 핸들러
  const handleCancel = () => {
    setNickname(user?.name || "");
    setIsEditing(false);
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
              maxLength={12}
              placeholder="2-12자, 영문/숫자/한글만 사용 가능"
            />
          ) : (
            <div className="w-[420px] h-[36px] border border-[#BFBFBF66]/40 rounded-[8px] flex items-center text-sm text-gray-500 px-3">
              {user?.name}
            </div>
          )}

          {isEditing ? (
            <div className="flex gap-2">
              <PageButton
                text={isLoading ? "저장 중..." : "저장"}
                variant="default"
                onClick={isLoading ? undefined : handleSave}
              />
              <PageButton
                text="취소"
                variant="default"
                onClick={isLoading ? undefined : handleCancel}
              />
            </div>
          ) : (
            <PageButton
              text="변경하기"
              variant="default"
              onClick={() => setIsEditing(true)}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default NicknameSection;
