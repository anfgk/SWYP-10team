import { useAuthStore } from "@/stores/authStore";

const SocialIdSection = () => {
  const { user, setUser } = useAuthStore();

  // 테스트용 함수 (실제 구현 시 제거)
  const handleTestSetUser = () => {
    setUser({ name: "테스트유저", email: "test@example.com" });
  };

  return (
    <div>
      <div className="w-70 h-6 bg-gray-200 mb-2 flex items-center px-2 text-sm text-gray-500">
        {user?.email || "소셜ID"}
      </div>
      {/* 테스트용 버튼 (실제 구현 시 제거) */}
      <button
        onClick={handleTestSetUser}
        className="text-xs text-blue-500 underline"
      >
        테스트: 이메일 설정
      </button>
    </div>
  );
};

export default SocialIdSection;
