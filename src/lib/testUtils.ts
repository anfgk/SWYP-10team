import { fetchWithAuth, fetchWithoutAuth } from "./fetchUtils";

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

const reviewWriteTest = async () => {
  const content = "찰떡이는 고양이 귀여워";
  const images = ["/1.jpeg", "/2.jpeg", "/3.jpeg"];
  const formData = new FormData();
  for (const imgPath of images) {
    const response = await fetch(imgPath);
    const blob = await response.blob();
    // "images"는 서버에서 받는 파라미터명 맞춰야 함
    formData.append("images", blob, imgPath.split("/").pop() || "image.jpg");
  }
  try {
    await fetchWithAuth(
      `/api/review/125419?contentId=125419&score=4.0&content=${encodeURIComponent(content)}`,

      {
        method: "POST",
        body: formData,
      }
    );
  } catch (e) {
    console.log("실패", e);
  }
};
export { searchTest, reviewWriteTest };
