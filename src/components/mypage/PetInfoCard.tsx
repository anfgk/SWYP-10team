import PageButton from "@/components/ui/page-button";
import InputField from "@/components/ui/input-field";
import { useState } from "react";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";

const PetInfoCard = () => {
  const [gender, setGender] = useState("수컷");
  const petFields = ["이름", "종류", "나이", "사이즈"];

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
                      checked={gender === "수컷"}
                      onChange={(e) => setGender(e.target.value)}
                      className="sr-only"
                    />

                    <div
                      className={`w-[24px] h-[24px] border-2 rounded-full flex items-center justify-center ${
                        gender === "수컷"
                          ? "bg-blue-500"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {gender === "수컷" && (
                        <div className="w-2 h-2 rounded-full"></div>
                      )}
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
                      checked={gender === "암컷"}
                      onChange={(e) => setGender(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-[24px] h-[24px] border-2 rounded-full flex items-center justify-center ${
                        gender === "암컷"
                          ? "bg-[var(--main-color)]"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {gender === "암컷" && (
                        <div className="w-2 h-2 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>
            {petFields.map((field) => (
              <div key={field} className="flex items-center">
                <div className="w-20">{field}</div>
                <InputField />
              </div>
            ))}
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
