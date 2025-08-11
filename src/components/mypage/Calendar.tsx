"use client";

import * as React from "react";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";

interface CalendarProps {
  value: string;
  onChange: (date: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Calendar = ({ value, onChange, isOpen, onClose }: CalendarProps) => {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : new Date()
  );

  React.useEffect(() => {
    if (value) setDate(new Date(value));
  }, [value]);

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      onChange(selectedDate.toISOString().split("T")[0]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-[-5] right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
      <ShadcnCalendar
        mode="single"
        selected={date}
        onSelect={handleSelect}
        className="rounded-md border shadow-sm top-full left-0"
        captionLayout="dropdown"
      />
    </div>
  );
};

export default Calendar;
