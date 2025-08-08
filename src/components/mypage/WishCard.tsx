interface WishCardProps {
  id: number;
  name: string;
  image?: string;
  imageUrl?: string;
  description?: string;
  isWished: boolean;
  onToggleWish: (id: number) => void;
}

const WishCard = ({ name, image, imageUrl, description }: WishCardProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative w-45 h-30 bg-gray-300 rounded-lg overflow-hidden">
        {image || imageUrl ? (
          <img
            src={image || imageUrl}
            alt={name}
            className="w-45 h-30 object-cover"
          />
        ) : (
          <div className="w-45 h-30 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
            장소 이미지
          </div>
        )}
      </div>
      <div className="text-sm font-medium text-gray-800">{name}</div>
      {description && (
        <div className="text-xs text-gray-600">{description}</div>
      )}
    </div>
  );
};

export default WishCard;
