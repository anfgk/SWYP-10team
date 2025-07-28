import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface CalendarProps {
  value: string;
  onChange: (date: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Calendar = ({ value, onChange, isOpen, onClose }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const handleDateSelect = (day: number) => {
    onChange(
      formatDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      )
    );
    onClose();
  };

  const handleMonthChange = (direction: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  if (!isOpen) return null;

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  // 이전 달 빈칸
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`prev-${i}`} className="w-8 h-8" />);
  }

  // 현재 달 날짜들
  for (let day = 1; day <= daysInMonth; day++) {
    const isSelected =
      value ===
      formatDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      );
    days.push(
      <button
        key={day}
        onClick={() => handleDateSelect(day)}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
          isSelected
            ? "bg-[var(--main-color)] text-white"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 w-[300px]">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => handleMonthChange(-1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <IoChevronBack className="w-4 h-4" />
        </button>
        <span className="font-medium">
          {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
        </span>
        <button
          type="button"
          onClick={() => handleMonthChange(1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <IoChevronForward className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="w-8 h-8 flex items-center justify-center text-xs text-gray-500 font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  );
};

export default Calendar;
