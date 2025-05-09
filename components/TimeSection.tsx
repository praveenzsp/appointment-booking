import { useState, useRef, useEffect } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import { TIME_SLOTS } from '../app/appointment-booking/constants';

interface TimeSectionProps {
  selectedTime: string;
  onTimeChange: (time: string) => void;
}

export const TimeSection = ({ selectedTime, onTimeChange }: TimeSectionProps) => {
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const timeCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (timeCardRef.current && !timeCardRef.current.contains(event.target as Node)) {
        setShowTimeDropdown(false);
      }
    }

    if (showTimeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTimeDropdown]);

  return (
    <div
      className="flex items-center bg-white shadow-xs border border-[#e6ecea] p-6 flex-1 min-w-[260px] max-w-xs min-h-[100px] cursor-pointer relative"
      onClick={() => setShowTimeDropdown((prev) => !prev)}
      ref={timeCardRef}
    >
      <ClockIcon className="h-7 w-7 text-gray-400 mr-4" />
      <div className="font-semibold text-[#1a232b]">{selectedTime}</div>
      {showTimeDropdown && (
        <div className="absolute top-full left-0 z-50 mt-2 bg-white border border-[#e6ecea] rounded shadow w-full max-h-60 overflow-y-auto">
          {Object.entries(TIME_SLOTS).map(([period, slots]) => (
            <div key={period}>
              <div className="px-4 py-2 text-xs font-bold text-gray-500 bg-[#f3f8f7] sticky top-0 z-10">{period}</div>
              {slots.map((slot) => (
                <div
                  key={slot}
                  className={`px-4 py-2 hover:bg-[#f3f8f7] cursor-pointer ${slot === selectedTime ? 'bg-[#f3f8f7] font-semibold' : ''}`}
                  onClick={() => {
                    onTimeChange(slot);
                    setShowTimeDropdown(false);
                  }}
                >
                  {slot}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 