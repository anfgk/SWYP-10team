import { useState, useEffect } from "react";
import WishCard from "./WishCard";
import { useAuthStore } from "@/stores/authStore";
import { fetchWishList } from "@/lib/apiUtils";

const WishPlaces = () => {
  const { accessToken } = useAuthStore();
  const [wishList, setWishList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWishPlaces = async () => {
    if (!accessToken) {
      setError("로그인이 필요합니다.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchWishList(accessToken);
      setWishList(Array.isArray(data) ? data : []);
    } catch (_error) {
      setError("위시리스트를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishPlaces();
  }, [accessToken]);

  const handleToggleWish = async (id: number) => {
    // 위시리스트에서 제거하는 로직
    setWishList((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <p className="text-gray-500">위시리스트를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (wishList.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <p className="text-gray-500">위시리스트가 비어있습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-fit flex flex-col gap-[16px]">
      {wishList.map((wish) => (
        <WishCard
          key={wish.id}
          id={wish.id}
          name={wish.name || wish.title}
          image={wish.image || wish.imageUrl || wish.thumbnail}
          description={wish.description}
          isWished={true}
          onToggleWish={handleToggleWish}
        />
      ))}
    </div>
  );
};

export default WishPlaces;
