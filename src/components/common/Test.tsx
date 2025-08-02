import { logoutProcess } from "@/lib/authUtils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative w-fit">
      {/* 클릭할 사진 */}
      <img
        src="/assets/samples/profile_sample.png"
        alt="thumbnail"
        className="w-[32px] h-[32px] rounded-full cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute top-[40px] right-[-37px] z-10 w-[100px] bg-white py-1 rounded shadow-lg border font-pretendard font-semibold">
          <button
            onClick={() => navigate("/myinfo")}
            className="flex w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-black justify-center"
          >
            마이페이지
          </button>
          <button
            onClick={() => logoutProcess()}
            className="flex w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-black justify-center"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default Test;
