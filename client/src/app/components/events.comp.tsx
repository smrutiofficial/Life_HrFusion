import Image from "next/image";

export default function UpcomingEvents() {
  return (
    <div className="py-6 px-10 rounded-2xl w-full shadow-md">
      {/* <h2 className="text-white font-semibold text-xl mb-4">Upcoming Events</h2> */}

      <div className="flex justify-center gap-35 border-b border-gray-700 pb-2">
        <h3 className="text-gray-400 font-medium text-sm tracking-wide">
          Birthdays This Week
        </h3>
        <h3 className="text-[#97BA8B] font-medium text-sm tracking-wide">
          Work Anniversaries
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Birthdays */}
        <div className="space-y-3">
          <div className="flex items-center border border-dashed border-gray-500 p-4 h-20 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden relative">
              <Image
                src="/images/emp9.jpg"
                alt="Sarah Johnson"
                layout="fill"
                className="w-full h-full rounded-full border-2 border-gray-700 object-cover"
              />
            </div>
            <div className="ml-3">
              <p className="text-white font-semibold text-sm">Sarah Johnson</p>
              <p className="text-gray-400 text-xs">Dec 15</p>
            </div>
          </div>

          <div className="flex items-center border border-dashed border-gray-500 p-4 h-20 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden relative">
              <Image
                src="/images/emp5.jpg"
                alt="Sarah Johnson"
                layout="fill"
                className="w-full h-full rounded-full border-2 border-gray-700 object-cover"
              />
            </div>
            <div className="ml-3">
              <p className="text-white font-semibold text-sm">Michael Chen</p>
              <p className="text-gray-400 text-xs">Dec 18</p>
            </div>
          </div>
        </div>

        {/* Work Anniversaries */}
        <div>
          <div className="flex items-center border border-dashed border-gray-500 p-4 h-20 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden relative">
              <Image
                src="/images/emp7.jpg"
                alt="Sarah Johnson"
                layout="fill"
                className="w-full h-full rounded-full border-2 border-gray-700 object-cover"
              />
            </div>
            <div className="ml-3">
              <p className="text-white font-semibold text-sm">Emily Parker</p>
              <p className="text-gray-400 text-xs">5 Years - Dec 16</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
