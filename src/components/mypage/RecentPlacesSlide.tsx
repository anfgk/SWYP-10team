import WishCard from "@/components/mypage/WishCard";

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

const RecentPlacesSlide = ({ placeList, onToggleWish }: Props) => {
  return (
    <div className="flex justify-between flex-shrink-0 gap-[16px]">
      {placeList.map((place, index) => (
        <WishCard
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

export default RecentPlacesSlide;
