import { ClipboardIcon, UserIcon } from '@heroicons/react/24/outline';

export const ServiceStaffSection = () => {
  return (
    <>
      {/* Service */}
      <div className="flex items-center bg-white shadow-xs border border-[#e6ecea] p-6 flex-1 min-w-[260px] max-w-xs min-h-[100px]">
        <ClipboardIcon className="h-7 w-7 text-gray-400 mr-4" />
        <div>
          <div className="font-semibold text-[#1a232b]">Maintenance Planning</div>
          <div className="text-gray-400 text-xs">( 30 mins )</div>
        </div>
      </div>
      {/* Staff */}
      <div className="flex items-center bg-white shadow-xs border border-[#e6ecea] p-6 flex-1 min-w-[260px] max-w-xs min-h-[100px]">
        <UserIcon className="h-7 w-7 text-gray-400 mr-4" />
        <div className="font-semibold text-[#1a232b]">Rapalle Ravindra</div>
      </div>
    </>
  );
}; 