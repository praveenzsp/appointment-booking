import { useState, useRef, useEffect } from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerSectionProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const DatePickerSection = ({ selectedDate, onDateChange }: DatePickerSectionProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dateCardRef.current && !dateCardRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    }

    if (showDatePicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDatePicker]);

  return (
    <div
      className="flex items-center bg-white shadow-xs border border-[#e6ecea] p-6 flex-1 min-w-[260px] max-w-xs min-h-[100px] cursor-pointer relative"
      onClick={() => setShowDatePicker(true)}
      ref={dateCardRef}
    >
      <CalendarIcon className="h-7 w-7 text-gray-400 mr-4" />
      <div className="font-semibold text-[#1a232b]">
        {selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
      </div>
      {showDatePicker && (
        <div className="absolute top-full left-0 z-50 mt-2">
          <DatePicker selected={selectedDate} onChange={(date) => onDateChange(date ?? new Date())} inline />
        </div>
      )}
    </div>
  );
}; 