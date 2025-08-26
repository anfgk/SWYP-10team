import RecentCard from "@/components/mypage/RecentCard";

interface RecentPlace {
  id: number;
  contentId: number;
  name: string;
  title?: string;
  image?: string;
  imageUrl?: string;
  thumbnail?: string;
  description?: string;
  isWish?: boolean;
}

interface Props {
  placeList: RecentPlace[];
  onToggleWish: (id: number) => void;
}

const RecentSlide = ({ placeList, onToggleWish }: Props) => {
  // 각 그룹 컨테이너의 고정 폭: 카드 224 * 4 + 갭 16 * 3 = 944px
  const GROUP_WIDTH = 224 * 4 + 16 * 3;
  return (
    <div
      className="flex flex-shrink-0 gap-[16px]"
      style={{ width: `${GROUP_WIDTH}px` }}
    >
      {placeList.map((place, index) => (
        <RecentCard
          key={index}
          id={place.contentId}
          name={place.name || place.title || ""}
          image={place.image || place.imageUrl || place.thumbnail}
          description={place.description}
          isWish={place.isWish || false}
          onToggleWish={onToggleWish}
        />
      ))}
    </div>
  );
};

export default RecentSlide;
