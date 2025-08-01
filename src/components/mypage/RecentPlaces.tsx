import { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const RecentPlaces = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const recentList = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `최근 본 장소${i + 1}`,
  }));

  const handlePrevSlide = () => {
    setCurrentIndex(
      currentIndex === 0 ? recentList.length - 5 : currentIndex - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentIndex(
      currentIndex >= recentList.length - 5 ? 0 : currentIndex + 1
    );
  };

  const visibleItems = [
    { id: 1, imgUrl: "https://picsum.photos/200/300", title: "제목1" },
    { id: 2, imgUrl: "https://picsum.photos/200/300", title: "제목2" },
    { id: 3, imgUrl: "https://picsum.photos/200/300", title: "제목3" },
    { id: 4, imgUrl: "https://picsum.photos/200/300", title: "제목4" },
    { id: 5, imgUrl: "https://picsum.photos/200/300", title: "제목5" },
  ];

  // 처음에 무조건 한 번 실행, 그리고 배열에 있는 값이 바뀌면 또 실행
  useEffect(() => {
    const 실제데이터 = async () => {
      const response = await fetch("api주소");
      const data = await response.json();
      setData(data);
    };

    실제데이터();
  }, []);

  const buttonStyle =
    "absolute top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-red-500 text-white hover:bg-red-600 hover:scale-110 cursor-pointer";

  return (
    <div className="mt-12 mb-16">
      <h2 className="text-xl font-semibold mb-6">최근 본 장소</h2>
      <div className="relative overflow-hidden">
        <div className="flex gap-4 transition-all duration-500 ease-in-out">
          {visibleItems.map((item) => (
            <div key={`${item.id}-${currentIndex}`} className="flex-shrink-0">
              <div className="w-45 h-30 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                장소 이미지
              </div>

              <div className="mt-2 text-sm font-medium">{item.title}</div>
            </div>
          ))}
        </div>

        <button onClick={handlePrevSlide} className={`left-0 ${buttonStyle}`}>
          <IoChevronBack size={16} />
        </button>

        <button onClick={handleNextSlide} className={`right-0 ${buttonStyle}`}>
          <IoChevronForward size={16} />
        </button>
      </div>
    </div>
  );
};

export default RecentPlaces;
