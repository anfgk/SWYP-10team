import type { MixedImage } from "@/types/forFrontTypes";
import type { ResponseImage } from "@/types/apiResponseTypes";
import { fetchWithAuth } from "./fetchUtils";

const writeReview = async (
  id: string,
  rating: number,
  content: string,
  images: File[]
) => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append("images", image);
  });
  content = content + " ";
  try {
    const res = await fetchWithAuth(
      `/api/review/${id}?score=${rating}&content=${encodeURIComponent(content)}`,
      { method: "POST", body: formData }
    );

    if (!res.ok) throw new Error("리뷰 작성 실패");

    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error("리뷰 작성 요청 실패: ", e);
  }
};

const editReview = async (
  id: string,
  rating: number,
  content: string,
  images: MixedImage[]
) => {
  const formData = new FormData();
  images.forEach((image) => {
    if (!isResponseImage(image)) {
      // File 타입인 경우만 append
      formData.append("images", image);
    }
  });

  content = content + " ";
  try {
    const res = await fetchWithAuth(
      `/api/review/${id}?score=${rating}&content=${encodeURIComponent(content)}`,
      { method: "PUT", body: formData }
    );

    if (!res.ok) throw new Error("리뷰 작성 실패");

    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error("리뷰 작성 요청 실패: ", e);
  }
};

const isResponseImage = (img: MixedImage): img is ResponseImage => {
  return (
    typeof img === "object" &&
    img !== null &&
    "imageId" in img &&
    "imageUrl" in img
  );
};

export { writeReview, isResponseImage, editReview };
