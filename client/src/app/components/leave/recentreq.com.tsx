import React from "react";

const requests = [
  { type: "Annual Leave", date: "Dec 24 - Dec 26", status: "Pending" },
  { type: "Sick Leave", date: "Dec 15", status: "Approved" },
  { type: "Personal Leave", date: "Dec 10", status: "Rejected" },
];

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-200/20 text-yellow-300",
  Approved: "bg-green-200/20 text-green-300",
  Rejected: "bg-red-200/20 text-red-300",
};

const RecentRequests = () => {
  return (
    <div className="bg-[#1D2135] text-white px-8 py-8 rounded-xl shadow-lg w-full transform -translate-x-9.5">
      <h2 className="text-lg font-semibold mb-4 pt-4">Recent Requests</h2>

      <div className="space-y-3">
        {requests.map((request, index) => (
          <div key={index} className="bg-[#363B58] py-8 px-8 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg pb-1 font-semibold">{request.type}</h3>
              <p className="text-xs text-gray-400">{request.date}</p>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-sm ${statusColors[request.status]}`}>
              {request.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentRequests;
