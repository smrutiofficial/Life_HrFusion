import { FaBell } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
export default function DashboardNotifications() {
  return (
    <div className="px-4 py-6 flex flex-col gap-6">
      {/* Inbox Section */}
      <div className="bg-[#1D2135] py-6 px-4 rounded-xl border border-gray-600">
        <div className="flex gap-4 items-center mb-4 px-2">
          <h2 className="text-white font-semibold text-lg">Inbox</h2>
          <span className="bg-[#EB6B6B] text-white text-xs h-5 w-5 flex justify-center items-center rounded-full">
            5
          </span>
        </div>

        <div className="space-y-3">
          {/* Notification 1 */}
          <div className="bg-[#363B58] p-3 rounded-lg flex items-center gap-4 px-8">
            <span className="text-[#E8C16D] text-xl">
              <FaBell />
            </span>
            <div>
              <p className="text-white font-semibold">Leave Request Pending</p>
              <p className="text-gray-400 text-sm">
                Sarah Johnson requested 3 days leave
              </p>
            </div>
          </div>

          {/* Notification 2 */}
          <div className="bg-[#363B58] p-3 rounded-lg flex items-center gap-4 px-8">
            <span className="text-[#97BA8B] text-xl">
              <FaCircleCheck />
            </span>
            <div>
              <p className="text-white font-semibold">Payroll Generated</p>
              <p className="text-gray-400 text-sm">
                December payroll has been processed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements Section */}
      <div className="bg-[#1D2135] py-7 px-4 rounded-xl border border-gray-600">
        {/* <h2 className="text-white font-semibold text-lg pl-2 mb-4">Announcements
          </h2> */}
        <div className="flex gap-4 items-center mb-4 px-2">
          <h2 className="text-white font-semibold text-lg">Announcements</h2>
          <span className="bg-[#EB6B6B] text-white text-xs h-5 w-5 flex justify-center items-center rounded-full">
            5
          </span>
        </div>

        <div className="space-y-3">
          {/* Announcement 1 */}
          <div className="bg-[#363B58] p-3 rounded-lg px-8">
            <p className="text-white font-semibold">Year End Party</p>
            <p className="text-gray-400 text-sm">
              Join us for the annual celebration on Dec 23rd
            </p>
          </div>

          {/* Announcement 2 */}
          <div className="bg-[#363B58] p-3 rounded-lg px-8">
            <p className="text-white font-semibold">Office Holiday</p>
            <p className="text-gray-400 text-sm">
              Office will be closed on Dec 25th for Christmas
            </p>
          </div>
          {/* Announcement 3 */}
          <div className="bg-[#363B58] p-3 rounded-lg px-8">
            <p className="text-white font-semibold">Office Holiday</p>
            <p className="text-gray-400 text-sm">
              Office will be closed on Dec 25th for Christmas
            </p>
          </div>
          {/* Announcement 4 */}
          <div className="bg-[#363B58] p-3 rounded-lg pb-8 px-8">
            <p className="text-white font-semibold">Office Holiday</p>
            <p className="text-gray-400 text-sm">
              Office will be closed on Dec 25th for Christmas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
