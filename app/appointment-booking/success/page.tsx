'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const params = useSearchParams();
  const router = useRouter();

  // Get booking details from query params
  const name = params.get('name');
  const email = params.get('email');
  const mobileNumber = params.get('mobileNumber');
  const address = params.get('address');
  const date = params.get('date');
  const time = params.get('time');
  const timezone = params.get('timezone');
  const staff = params.get('staff') || 'Rapalle Ravindra';

  // Format date
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Appointment Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Your appointment with <span className="font-semibold text-[#ff4081]">{staff}</span> has been scheduled
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header with checkmark */}
          <div className="bg-gradient-to-r from-[#ff4081] to-[#ff6e9f] p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
              <svg width="32" height="32" fill="none" viewBox="0 0 48 48">
                <path d="M18 24l5 5 7-7" stroke="#ff4081" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed</h2>
            {/* <p className="text-white/90">We have sent a confirmation email to {email}</p> */}
          </div>

          {/* Booking Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Date & Time */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">APPOINTMENT TIME</h3>
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold text-gray-900">{formattedDate}</p>
                    <p className="text-xl text-gray-700">{time}</p>
                    <p className="text-sm text-gray-500">{timezone}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">SERVICE</h3>
                  <p className="text-lg font-medium text-gray-900">Maintenance Planning</p>
                </div>
              </div>

              {/* Right Column - Personal Details */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">BOOKING DETAILS</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-base font-medium text-gray-900">{name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-base font-medium text-gray-900">{email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="text-base font-medium text-gray-900">{mobileNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-base font-medium text-gray-900">{address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => router.push('/appointment-booking')}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#ff4081] hover:bg-[#e63d75] transition-colors duration-200"
              >
                Book Another Appointment
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
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