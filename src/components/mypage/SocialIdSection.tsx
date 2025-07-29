import { useAuthStore } from "@/stores/authStore";
import InputField from "@/components/ui/input-field";

const SocialIdSection = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <div className="flex items-center text-[16px] font-[400] gap-[24px] mb-[56px]">
        {user?.email || "소셜ID"}
        <InputField />
      </div>
    </div>
  );
};

export default SocialIdSection;
