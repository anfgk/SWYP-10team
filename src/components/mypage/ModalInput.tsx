import { useState, useEffect, useRef } from "react";
import { IoChevronDown, IoCalendar } from "react-icons/io5";
import Calendar from "./Calendar";

interface ModalInputProps {
  label: string;
  type: "text" | "select" | "radio" | "date";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: { value: string; label: string }[];
  radioOptions?: {
    value: string;
    label: string;
    icon: string;
    color: string;
  }[];
}

const ModalInput = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  options = [],
  radioOptions = [],
}: ModalInputProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const baseInputClass =
    "w-[442px] h-[48px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none";
  const labelClass = "text-sm font-medium text-gray-700";

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 드롭다운 외부 클릭 감지
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }

      // 캘린더 외부 클릭 감지
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (type === "radio") {
    return (
      <div className="flex items-center">
        <label
          htmlFor={`${label}-${radioOptions[0]?.value || "radio"}`}
          className={labelClass}
        >
          {label}
        </label>
        <div className="flex gap-4 ml-[50px]">
          {radioOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name={label}
                id={`${label}-${option.value}`}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
              />
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  value === option.value
                    ? option.color === "pink"
                      ? "border-[var(--main-color)] bg-[var(--main-color)]"
                      : `border-${option.color}-500 bg-${option.color}-500`
                    : "border-gray-200"
                }`}
              >
                {value === option.value && (
                  <div
                    className={`w-full h-full rounded-full ${
                      option.color === "pink"
                        ? "bg-[var(--main-color)]"
                        : "bg-blue-500"
                    }`}
                  />
                )}
              </div>
              <span
                className={`text-lg ${
                  option.color === "pink"
                    ? "text-[var(--main-color)]"
                    : `text-${option.color}-500`
                }`}
              >
                {option.icon}
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (type === "select") {
    const selectedOption = options.find((option) => option.value === value);
    const isOpen = openDropdown === label;

    return (
      <div className="flex items-center justify-between">
        <label htmlFor={label} className={labelClass}>
          {label}
        </label>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpenDropdown(isOpen ? null : label)}
            className={`${baseInputClass} bg-white text-left flex items-center justify-between ${
              value ? "text-[var(--text-color)]" : "text-gray-400"
            }`}
          >
            <span>{selectedOption ? selectedOption.label : placeholder}</span>
            <IoChevronDown
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpenDropdown(null);
                  }}
                  className={`w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors ${
                    value === option.value
                      ? "bg-gray-100 text-[var(--text-color)]"
                      : "text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (type === "date") {
    return (
      <div className="flex items-center justify-between">
        <label htmlFor={label} className={labelClass}>
          {label}
        </label>
        <div className="relative" ref={calendarRef}>
          <button
            type="button"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className={`${baseInputClass} bg-white text-left flex items-center justify-between ${
              value ? "text-[var(--text-color)]" : "text-gray-400"
            }`}
          >
            <span>{value || placeholder || "날짜를 선택해주세요"}</span>
            <IoCalendar className="w-4 h-4 text-gray-400" />
          </button>

          <Calendar
            value={value}
            onChange={onChange}
            isOpen={isCalendarOpen}
            onClose={() => setIsCalendarOpen(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <label htmlFor={label} className={labelClass}>
        {label}
      </label>
      <input
        type="text"
        name={label}
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={baseInputClass}
      />
    </div>
  );
};

export default ModalInput;
