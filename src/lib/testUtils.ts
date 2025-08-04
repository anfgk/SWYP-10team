import { fetchWithAuth } from "./fetchUtils";

const searchTest = async () => {
  try {
    const res = await fetchWithAuth("/api/user/profile", { method: "GET" });

    const data = await res.json();
    console.log(data.data.imageUrl); // 결과 확인용
  } catch (error) {
    console.error("검색 실패:", error);
  }
};

export { searchTest };
