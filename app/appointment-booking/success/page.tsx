'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const params = useSearchParams();
  const router = useRouter();

  // Get booking details from query params
  // const name = params.get('name');
  const date = params.get('date');
  const time = params.get('time');
  const timezone = params.get('timezone');
  const staff = params.get('staff') || 'Rapalle Ravindra';

  // Format date
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '';

  return (
    <div className="flex flex-col items-center justify-center bg-white gap-2">
      <h1 className="text-2xl md:text-3xl font-semibold mb-8 text-center mt-24">
        Appointment confirmed with {staff}!
      </h1>
      <div className="bg-white border border-[#e6ecea] rounded-2xl shadow-lg p-8 flex flex-col items-center max-w-md w-full">
        <div className="mb-4 flex items-center justify-center">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
            <rect width="48" height="48" rx="12" fill="#F3F8F7"/>
            <rect x="12" y="16" width="24" height="16" rx="2" fill="#fff" stroke="#BDBDBD" strokeWidth="2"/>
            <path d="M18 24l5 5 7-7" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="text-center mb-2">
          <span className="font-semibold text-lg">{formattedDate} | {time}</span>
        </div>
        <div className="text-gray-600 mb-1">Maintenance Planning</div>
        <div className="text-gray-500 text-sm mb-4">{timezone}</div>
        <div className="flex gap-4 justify-center">
          <a
            href="#"
            className="text-blue-600 underline text-sm"
            onClick={e => e.preventDefault()}
          >
            + Add to Calendar
          </a>
          <a
            href="#"
            className="text-blue-600 underline text-sm"
            onClick={e => e.preventDefault()}
          >
            Download as ICS
          </a>
        </div>
      </div>
      <button
        className="mt-8 text-[#3b3b3b] hover:underline text-base"
        onClick={() => router.push('/appointment-booking')}
      >
        Book another appointment &rarr;
      </button>
    </div>
  );
}

export default function BookingSuccess() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
} 