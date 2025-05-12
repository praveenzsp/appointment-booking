import { XMarkIcon } from '@heroicons/react/24/outline';

interface BookingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  selectedTimezone: { label: string; value: string };
  selectedTime: string;
  onSubmit: (formData: BookingFormData) => void;
}

export interface BookingFormData {
  name: string;
  email: string;
  mobileNumber: string;
  address: string;
}

export const BookingSidebar = ({ isOpen, onClose, selectedDate, selectedTimezone, selectedTime, onSubmit }: BookingSidebarProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      mobileNumber: formData.get('mobileNumber') as string,
      address: formData.get('address') as string,
    });
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Booking Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Selected Details */}
        <div className="mb-6 space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Selected Date & Time</h3>
            <p className="text-gray-900">{selectedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            <p className="text-gray-900">{selectedTime}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Timezone</h3>
            <p className="text-gray-900">{selectedTimezone.label}</p>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4081] focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4081] focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4081] focus:border-transparent"
                placeholder="Enter your mobile number"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff4081] focus:border-transparent"
                placeholder="Enter your address"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-auto w-full bg-[#ff4081] text-white py-3 rounded-md hover:bg-[#e63a73] transition-colors"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}; 