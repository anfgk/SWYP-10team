import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const RecentPlaces = () => {
  const recentList = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    name: `최근 본 장소${i + 1}`,
  }));

  return (
    <div className="mt-12 mb-16">
      <h2 className="text-xl font-semibold mb-6">최근 본 장소</h2>
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {recentList.map((item) => (
            <div key={item.id} className="flex-shrink-0">
              <div className="w-48 h-32 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                장소 이미지
              </div>
              <div className="mt-2 text-sm font-medium">{item.name}</div>
            </div>
          ))}
        </div>
        <button className="absolute right-250 top-16 transform -translate-y-1/2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
          <IoChevronBack size={16} />
        </button>
        <button className="absolute left-250 top-16 transform -translate-y-1/2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
          <IoChevronForward size={16} />
        </button>
      </div>
    </div>
  );
};

export default RecentPlaces;
