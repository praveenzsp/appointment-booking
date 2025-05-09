import { useState, useRef, useEffect } from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { TIMEZONES } from '../app/appointment-booking/constants';

interface TimezoneSectionProps {
  selectedTimezone: typeof TIMEZONES[0];
  onTimezoneChange: (timezone: typeof TIMEZONES[0]) => void;
}

export const TimezoneSection = ({ selectedTimezone, onTimezoneChange }: TimezoneSectionProps) => {
  const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false);
  const [timezoneSearch, setTimezoneSearch] = useState('');
  const timezoneCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (timezoneCardRef.current && !timezoneCardRef.current.contains(event.target as Node)) {
        setShowTimezoneDropdown(false);
      }
    }

    if (showTimezoneDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTimezoneDropdown]);

  return (
    <div className="relative flex-1 min-w-[260px] max-w-xs" ref={timezoneCardRef}>
      <div
        className="flex items-center bg-white shadow-xs border border-[#e6ecea] p-6 w-full min-h-[100px] cursor-pointer"
        onClick={() => setShowTimezoneDropdown((prev) => !prev)}
      >
        <GlobeAltIcon className="h-7 w-7 text-gray-400 mr-4" />
        <div className="font-semibold text-[#1a232b]">{selectedTimezone.label}</div>
      </div>
      {showTimezoneDropdown && (
        <div className="absolute top-full left-0 z-50 mt-2 bg-white border border-[#e6ecea] rounded shadow w-full max-h-60 overflow-y-auto">
          <div className="sticky top-0 z-10 bg-white p-2 border-b border-[#e6ecea]">
            <input
              type="text"
              className="w-full px-2 py-1 border border-[#e6ecea] rounded text-sm focus:outline-none"
              placeholder="Search timezones..."
              value={timezoneSearch}
              onChange={e => setTimezoneSearch(e.target.value)}
            />
          </div>
          {TIMEZONES.filter(tz => tz.label.toLowerCase().includes(timezoneSearch.toLowerCase())).length === 0 ? (
            <div className="px-4 py-2 text-gray-400 text-sm">No results found.</div>
          ) : (
            TIMEZONES.filter(tz => tz.label.toLowerCase().includes(timezoneSearch.toLowerCase())).map((tz) => (
              <div
                key={tz.value}
                className={`px-4 py-2 hover:bg-[#f3f8f7] cursor-pointer ${tz.value === selectedTimezone.value ? 'bg-[#f3f8f7] font-semibold' : ''}`}
                onClick={() => {
                  onTimezoneChange(tz);
                  setShowTimezoneDropdown(false);
                  setTimezoneSearch('');
                }}
              >
                {tz.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}; 