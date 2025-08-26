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
  return (
    <div className="flex flex-shrink-0 gap-[8px] overflow-x-auto">
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
