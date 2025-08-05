import PageButton from "@/components/ui/page-button";
import InputField from "@/components/ui/input-field";
import { useState, useEffect } from "react";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";

interface PetInfo {
  name: string;
  type: string;
  gender: string;
  age: number;
  size: string;
  image?: string;
}

const PetInfoCard = () => {
  const [gender, setGender] = useState("수컷");
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const petFields = ["이름", "종류", "나이", "사이즈"];

  console.log("petInfo", petInfo);

  // 아까전에 cors 에러 때문에 막혀있었는데, 이제 해결되었고,
  // 근데 지금 로컬에서 로그인이 불가능해서 계속 401로 막혀요. 혹시 임시 토큰이 있을까요 ?

  useEffect(() => {
    const fetchPetInfo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}api/pet/profile`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("response", response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          // API가 없을 때 기본 데이터 사용
          setPetInfo({
            name: "기본 이름",
            type: "강아지",
            gender: "수컷",
            age: 3,
            size: "중형",
          });
          return;
        }

        const data = await response.json();
        setPetInfo(data);
        console.log("반려동물 정보 로드 완료:", data);
      } catch (error) {
        console.error("반려동물 정보 로드 실패:", error);
        // 에러 시 기본 데이터 사용
        setPetInfo({
          name: "기본 이름",
          type: "강아지",
          gender: "수컷",
          age: 3,
          size: "중형",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPetInfo();
  }, []);

  if (isLoading) {
    return (
      <section>
        <div className="text-lg font-semibold mb-2">반려동물 정보</div>
        <div className="p-[24px] rounded-lg flex flex-col gap-4 border border-[#BFBFBF66]/40">
          <div className="text-center py-8 text-gray-500">로딩 중...</div>
        </div>
      </section>
    );
  }

  if (!petInfo) {
    return null;
  }

  return (
    <section>
      <div className="text-lg font-semibold mb-2">반려동물 정보</div>
      <div className="p-[24px] rounded-lg flex flex-col gap-4 border border-[#BFBFBF66]/40">
        <div className="flex gap-8 items-start">
          <div className="w-[300px] h-[200px] bg-gray-300" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center">
              <div className="w-20">성별</div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <AiOutlineMan className="text-blue-500 w-[24px] h-[24px]" />
                  <div className="relative">
                    <input
                      type="radio"
                      name="gender"
                      value="수컷"
                      checked={
                        petInfo.gender === "수컷" || petInfo.gender === "male"
                      }
                      onChange={(e) => setGender(e.target.value)}
                      className="sr-only"
                    />

                    <div
                      className={`w-[24px] h-[24px] border-2 rounded-full flex items-center justify-center ${
                        petInfo.gender === "수컷" || petInfo.gender === "male"
                          ? "bg-blue-500"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {petInfo.gender === "수컷" ||
                        (petInfo.gender === "male" && (
                          <div className="w-2 h-2 rounded-full"></div>
                        ))}
                    </div>
                  </div>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <AiOutlineWoman className="text-[var(--main-color)] w-[24px] h-[24px]" />
                  <div className="relative">
                    <input
                      type="radio"
                      name="gender"
                      value="암컷"
                      checked={
                        petInfo.gender === "암컷" || petInfo.gender === "female"
                      }
                      onChange={(e) => setGender(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-[24px] h-[24px] border-2 rounded-full flex items-center justify-center ${
                        petInfo.gender === "암컷" || petInfo.gender === "female"
                          ? "bg-[var(--main-color)]"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {petInfo.gender === "암컷" ||
                        (petInfo.gender === "female" && (
                          <div className="w-2 h-2 rounded-full"></div>
                        ))}
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-20">이름</div>
              <input
                type="text"
                value={petInfo.name}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
              />
            </div>
            <div className="flex items-center">
              <div className="w-20">종류</div>
              <input
                type="text"
                value={petInfo.type}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
              />
            </div>
            <div className="flex items-center">
              <div className="w-20">나이</div>
              <input
                type="text"
                value={`${petInfo.age}세`}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
              />
            </div>
            <div className="flex items-center">
              <div className="w-20">사이즈</div>
              <input
                type="text"
                value={petInfo.size}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <PageButton text="수정하기" variant="default" />
              <PageButton text="삭제하기" variant="default" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetInfoCard;
