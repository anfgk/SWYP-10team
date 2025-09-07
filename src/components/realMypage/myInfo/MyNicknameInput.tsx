import { useEffect, useRef, useState } from "react";
import { fetchWithAuth } from "@/lib/fetchUtils";
import { Input } from "@/components/ui/input";
import DefaultButtonConfirm from "@/components/common/DefaultButtonConfirm";
import DefaultButtonCancel from "@/components/common/DefaultButtonCancel";
import { useAuthStore } from "@/stores/authStore";
import { refetchProfile } from "@/lib/authUtils";
import { hasInvalidChars } from "@/lib/myInfoUtils";

const MyNicknameInput = () => {
  const { user } = useAuthStore();
  const [value, setValue] = useState(user?.name || "");
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(user?.name ?? "");
    setEditing(false);
  }, [user?.name]);

  useEffect(() => {
    if (editing) return;
    setValue(user?.name || "");
  }, [editing]);

  const enableEditing = () => {
    if (!editing) {
      setEditing(true);
      // 다음 프레임에 포커스
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const handleSubmit = async () => {
    const trimmed = value.trim();
    if (!editing) return;
    if (trimmed.length < 2) {
      alert("닉네임은 2자 이상이여야 합니다.");
      inputRef.current?.focus();
      return;
    }
    if (trimmed === user?.name) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    if (hasInvalidChars(trimmed)) {
      alert("이름에 특수문자, 공백을 포함할 수 없습니다.");
      return;
    }

    const formData = new FormData();
    formData.append("displayName", trimmed);

    try {
      const res = await fetchWithAuth(`/api/user/profile`, {
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
          alert("닉네임 수정에 실패했습니다.");
          throw new Error("닉네임 수정 요청 api 실패");
        }
        return;
      }

      alert("닉네임이 변경되었습니다.");
      await refetchProfile();
      setEditing(false);
    } catch (e) {
      console.log("닉네임 변경 요청 실패: ", e);
    }
  };

  return (
    <div className="w-full h-[40px] flex gap-[24px] items-center">
      <p className="w-[45px] h-full flex items-center text-[16px]">이름</p>
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClick={enableEditing}
        onFocus={enableEditing}
        readOnly={!editing}
        maxLength={12}
        className={`w-[332px] h-[40px] px-[16px] py-[12px] text-[14px] text-[var(--search-element-text)] font-semibold ${editing ? "bg-white cursor-text" : "bg-[var(--sem-fill-norm)] cursor-pointer"} rounded-[8px] !shadow-none border-[1px] border-[var(--search-element-border)]`}
        placeholder="닉네임을 입력하세요"
        aria-label="닉네임"
      />
      <div className="w-fit h-[36px] flex gap-[10px]">
        <DefaultButtonConfirm
          w={77}
          h={36}
          text="변경하기"
          textSize={14}
          onClick={handleSubmit}
          isActive={editing}
        />
        {editing && (
          <DefaultButtonCancel
            w={77}
            h={36}
            text="취소하기"
            textSize={14}
            onClick={() => setEditing(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MyNicknameInput;
