import PetInfoSection from "@/components/mypage/PetInfoSection";
import ProfileInfo from "@/components/mypage/ProfileInfo";

const MyInfoPage = () => {
  return (
    <>
      <div className="flex gap-16 mt-12">
        <div className="flex-1 flex flex-col">
          <ProfileInfo />
          <PetInfoSection />
        </div>
        <div className="flex items-center">
          <button className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center text-5xl text-gray-400">
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default MyInfoPage;
