//import { useSearchParams } from "react-router-dom";
import { fetchWithAuth, fetchWithoutAuth } from "./fetchUtils";
import { getSigunguCodesByNames } from "./searchUtils";

const searchTest = async () => {
  try {
    const res = await fetchWithoutAuth(
      "/api/content/search?title=&sido=&sigungu=&contentTypeId=",
      {
        method: "GET",
      },
    );

    //const data = await res.json();
    console.log(res); // 결과 확인용
  } catch (error) {
    console.error("검색 실패:", error);
  }
};

const reviewWriteTest = async () => {
  const content = "비비드라라러브";

  try {
    await fetchWithAuth(
      `/api/review/125419?contentId=125419&score=2.0&content=${encodeURIComponent(content)}`,

      {
        method: "POST",
      },
    );
  } catch (e) {
    console.log("실패", e);
  }
};

const paramTest = () => {
  const test = getSigunguCodesByNames("충남", "논산,서산,보령");
  alert(test);
};

export { searchTest, reviewWriteTest, paramTest };
