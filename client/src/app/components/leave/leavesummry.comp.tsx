import React from "react";
import { FaCalendarCheck, FaClock, FaRegCalendarAlt } from "react-icons/fa";

const LeaveSummary = () => {
  const leaveStats = [
    {
      title: "Available Balance",
      value: 15,
      icon: <FaRegCalendarAlt className="text-green-300" />,
      description: "Days remaining",
      color: "text-green-300",
    },
    {
      title: "Pending Requests",
      value: 2,
      icon: <FaClock className="text-yellow-300" />,
      description: "Awaiting approval",
      color: "text-yellow-300",
    },
    {
      title: "Approved Leaves",
      value: 8,
      icon: <FaCalendarCheck className="text-blue-300" />,
      description: "This year",
      color: "text-blue-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      {leaveStats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#1D2135] text-white p-4 rounded-xl shadow-lg flex items-center justify-between h-38 px-14 text-xl"
        >
          <div>
            <h3 className="text-md font-semibold">{stat.title}</h3>
            <p className="text-lg text-gray-400 pt-5 flex items-center gap-4">
              {stat.icon} {stat.description}
            </p>
          </div>
          <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
        </div>
      ))}
    </div>
  );
};

export default LeaveSummary;
