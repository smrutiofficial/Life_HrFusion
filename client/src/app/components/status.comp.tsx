import React, { useEffect, useState } from "react";

const Statuscomp = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newHiredThisMonth: 0,
    totalAbsentToday: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/status");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="w-[98%] rounded-xl h-[90%] border border-gray-500 bg-[#1D2135] flex justify-evenly items-center">
      <StatCard title="Total" value={stats.totalUsers} color="text-[#897EEF]" />
      <StatCard title="Active" value={stats.activeUsers} color="text-[#E8C16D]" />
      <StatCard title="Leave Today" value={stats.totalAbsentToday} color="text-[#EB6B6B]" />
      <StatCard title="New Hires" value={stats.newHiredThisMonth} color="text-[#97BA8B]" />
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className="h-[75%] w-[22%] flex flex-col items-center justify-evenly">
    <p className={`${color} text-md`}>{title}</p>
    <div className="rounded-xl flex justify-center items-center font-semibold w-full h-[60%] bg-[#363B58]">
      <p className="text-[20px] text-gray-300 font-me">{value}</p>
    </div>
  </div>
);

export default Statuscomp;
