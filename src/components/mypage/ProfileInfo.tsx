import PageButton from "@/components/ui/page-button";

const ProfileInfo = () => {
  return (
    <div>
      <div className="text-xl font-semibold mb-2">프로필 정보</div>
      <div className="flex items-center gap-4 mb-2">
        <div className="w-32 h-32 bg-gray-300 flex items-center justify-center text-gray-500 text-sm">
          프로필 이미지
        </div>
        <div className="flex flex-col gap-2 flex-1 justify-end h-32">
          <div className="flex gap-2">
            <PageButton text="변경" variant="default" />
            <PageButton text="삭제" variant="default" />
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center mb-2">
        <div className="w-70 h-6 bg-gray-200 mb-2 flex items-center px-2 text-sm text-gray-500">
          닉네임
        </div>
      </div>
      <div className="w-70 h-6 bg-gray-200 mb-2 flex items-center px-2 text-sm text-gray-500">
        소설ID
      </div>
    </div>
  );
};

export default ProfileInfo;
