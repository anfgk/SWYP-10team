import { useState, useEffect } from "react";

interface Location {
  latitude: number;
  longitude: number;
}

const useUserLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation API를 지원하지 않음");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      (error) => {
        setError("위치 거부됨 또는 오류");
        setLoading(false);
      }
    );
  }, []);

  return { location, error, loading };
};

export default useUserLocation;
