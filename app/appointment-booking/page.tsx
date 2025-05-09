'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TIMEZONES, TIME_SLOTS } from './constants';
import { ServiceStaffSection } from '../../components/ServiceStaffSection';
import { DatePickerSection } from '../../components/DatePickerSection';
import { TimezoneSection } from '../../components/TimezoneSection';
import { TimeSection } from '../../components/TimeSection';
import { BookingSidebar, BookingFormData } from '../../components/BookingSidebar';

export default function AppointmentBooking() {
  const [selectedDate, setSelectedDate] = useState(new Date('2025-05-10'));
  const [selectedTimezone, setSelectedTimezone] = useState(TIMEZONES[0]);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS.Morning[1]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const handleBookingSubmit = (formData: BookingFormData) => {
    const params = new URLSearchParams({
      name: formData.name,
      date: selectedDate.toISOString(),
      time: selectedTime,
      timezone: selectedTimezone.label,
      staff: 'Rapalle Ravindra',
    }).toString();
    router.push(`/appointment-booking/success?${params}`);
  };

  return (
    <div className="min-h-screen bg-[#f3f8f7] flex flex-col">
      <div className="flex flex-col gap-20 items-center mx-30">
        <div className='flex flex-col gap-4 mt-20 justify-center items-start md:-ml-48 px-2 md:px-0'>
          <h1 className='text-3xl md:text-4xl font-semibold'>Welcome!</h1>
          <p className='text-gray-700 text-sm w-full md:max-w-none'>
            Book your appointment in a few simple steps: Choose a service, pick your date and time, and fill in your details. See you soon!
          </p>
        </div>
        <div className="w-full max-w-5xl">
          {/* Top row: Service, Staff, Date */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-6 mb-4 items-center justify-center">
            <ServiceStaffSection />
            <DatePickerSection selectedDate={selectedDate} onDateChange={setSelectedDate} />
          </div>
          {/* Bottom row: Timezone, Time, Book Button */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-6 items-center justify-center mt-2 ml-0">
            <TimezoneSection selectedTimezone={selectedTimezone} onTimezoneChange={setSelectedTimezone} />
            <TimeSection selectedTime={selectedTime} onTimeChange={setSelectedTime} />
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="min-h-[100px] bg-[#ff4081] text-white md:px-[91px] cursor-pointer px-[81px]"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Booking Sidebar */}
      <BookingSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        selectedDate={selectedDate}
        selectedTimezone={selectedTimezone}
        selectedTime={selectedTime}
        onSubmit={handleBookingSubmit}
      />
    </div>
  );
} 