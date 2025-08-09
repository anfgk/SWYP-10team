import { useAuthStore } from "@/stores/authStore";

const SocialIdSection = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <div className="flex items-center text-[16px] font-[400] gap-[24px] mb-[56px]">
        소셜ID
        <div className="w-[420px] h-[36px] border border-[#BFBFBF66]/40 rounded-[8px] flex items-center text-sm text-gray-500 px-3">
          {user?.email || "소셜 ID를 입력해주세요"}
        </div>
      </div>
    </div>
  );
};

export default SocialIdSection;
