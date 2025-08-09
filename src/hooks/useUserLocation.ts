import { useEffect } from "react";
import { useLocationStore } from "@/stores/locationStore";

const useUserLocation = () => {
  const { setCoords, setIsCoordsSet } = useLocationStore();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setCoords(longitude, latitude);
          setIsCoordsSet(true);
        },
        (error) => {
          console.log("위치 거부됨 또는 오류", error.message);
        },
      );
    } else {
      console.log("Geolocation API를 지원하지 않음");
    }
  }, []);
};

export default useUserLocation;
