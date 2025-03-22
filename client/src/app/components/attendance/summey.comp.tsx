import React from "react";
import { CheckCircle, XCircle, Clock, Calendar } from "lucide-react";

const summaryData = [
  { label: "Present Days", value: 18, icon: <CheckCircle className="text-[#97BA8B]" />, bg: "bg-[#363B58]" },
  { label: "Absent Days", value: 2, icon: <XCircle className="text-[#EB6B6B]" />, bg: "bg-[#363B58]" },
  { label: "Late Arrivals", value: 3, icon: <Clock className="text-[#efd57e]" />, bg: "bg-[#363B58]" },
  { label: "Leave Days", value: 1, icon: <Calendar className="text-[#897EEF]" />, bg: "bg-[#363B58]" },
];

const AttendanceSummary: React.FC = () => {
  return (
    <div className="relative px-25 py-14">
      <h3 className="text-2xl font-bold text-white mb-6">
        <span className="text-[#897EEF]">Attendance</span> Summary
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {summaryData.map((item, index) => (
          <div key={index} className={`${item.bg} flex items-center p-4 rounded-lg shadow-md`}>
            <div className="text-2xl">{item.icon}</div>
            <div className="ml-4">
              <p className="text-gray-400 text-sm">{item.label}</p>
              <p className="text-white text-xl font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceSummary;
