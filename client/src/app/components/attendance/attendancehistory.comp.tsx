import React from "react";

const attendanceData = [
  { date: "Mar 20, 2024", checkIn: "09:00 AM", checkOut: "06:00 PM", hours: "9h", status: "On-time" },
  { date: "Mar 19, 2024", checkIn: "09:15 AM", checkOut: "06:00 PM", hours: "8.75h", status: "Late" },
];

const AttendanceHistory: React.FC = () => {
  return (
    <div className="relative bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
      <div className="flex justify-between items-center pb-4">
        <h3 className="text-xl font-bold text-white">Monthly Attendance History</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-700 text-white text-sm px-4 py-2 rounded-md outline-none w-32"
          />
          <select className="bg-gray-700 text-white text-sm px-4 py-2 rounded-md outline-none">
            <option>March 2024</option>
          </select>
        </div>
      </div>
      <div className="relative w-full">
        <div className="flex text-gray-400 bg-gray-900 py-3 px-4 rounded-t-lg">
          <div className="flex-1">Date</div>
          <div className="flex-1">Check-in</div>
          <div className="flex-1">Check-out</div>
          <div className="flex-1">Hours</div>
          <div className="flex-1">Status</div>
        </div>
        {attendanceData.map((entry, index) => (
          <div
            key={index}
            className="flex bg-gray-800 py-3 px-4 border-b border-gray-700 last:rounded-b-lg"
          >
            <div className="flex-1 text-white">{entry.date}</div>
            <div className="flex-1 text-gray-300">{entry.checkIn}</div>
            <div className="flex-1 text-gray-300">{entry.checkOut}</div>
            <div className="flex-1 text-gray-300">{entry.hours}</div>
            <div className="flex-1">
              <span
                className={`px-3 py-1 rounded-md text-xs font-bold ${
                  entry.status === "On-time" ? "bg-green-600 text-white" : "bg-yellow-500 text-black"
                }`}
              >
                {entry.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceHistory;
