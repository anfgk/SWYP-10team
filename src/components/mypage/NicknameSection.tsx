import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { updateUserProfile } from "@/lib/apiUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NicknameSectionProps {
  onNicknameUpdate?: (newNickname: string) => void;
}

const NicknameSection = ({ onNicknameUpdate }: NicknameSectionProps) => {
  const { accessToken } = useAuthStore();
  const [nickname, setNickname] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!accessToken) {
      setError("로그인이 필요합니다.");
      return;
    }

    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await updateUserProfile(accessToken, nickname.trim());

      setIsEditing(false);
      onNicknameUpdate?.(nickname.trim());
    } catch (error) {
      setError("닉네임 업데이트에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNickname("");
    setError(null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">닉네임</h3>

      {isEditing ? (
        <div className="space-y-3">
          <Input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력하세요"
            maxLength={12}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={loading} className="flex-1">
              {loading ? "저장 중..." : "저장"}
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              취소
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-gray-600">
            {nickname || "닉네임을 설정해주세요"}
          </span>
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            수정
          </Button>
        </div>
      )}
    </div>
  );
};

export default NicknameSection;
