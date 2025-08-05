import { fetchWithoutAuth } from "./fetchUtils";

const searchTest = async () => {
  try {
    const res = await fetchWithoutAuth(
      "/api/content/search?title=&sido=&sigungu=&contentTypeId=",
      {
        method: "GET",
      }
    );

    //const data = await res.json();
    console.log(res); // 결과 확인용
  } catch (error) {
    console.error("검색 실패:", error);
  }
};

export { searchTest };
