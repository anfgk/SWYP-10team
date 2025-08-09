import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { fetchUserProfile } from "@/lib/apiUtils";

const ProfileInfo = () => {
  const { accessToken, user } = useAuthStore();
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfileData = async () => {
    if (!accessToken) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchUserProfile(accessToken);
      setProfileData(data);
    } catch (error) {
      setError("프로필 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, [accessToken]);

  if (loading) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <p className="text-gray-500">프로필 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const displayName =
    profileData?.displayName || profileData?.name || user?.name || "사용자";
  const email = profileData?.email || user?.email || "";
  const profileImage = profileData?.profileImage || profileData?.image;

  return (
    <div className="flex items-center gap-4 p-4">
      <div className="w-16 h-16 rounded-full overflow-hidden">
        {profileImage ? (
          <img
            src={profileImage}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
            프로필
          </div>
        )}
      </div>
      <div>
        <h2 className="text-xl font-semibold">{displayName}</h2>
        <p className="text-gray-600">{email}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
