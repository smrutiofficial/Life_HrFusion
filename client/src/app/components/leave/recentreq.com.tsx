"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-200/20 text-yellow-300",
  Approved: "bg-green-200/20 text-green-300",
  Rejected: "bg-red-200/20 text-red-300",
};

const RecentRequests = () => {
  const [requests, setRequests] = useState<
    { leaveType: string; startDate: string; endDate: string; status: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await axios.get("http://localhost:5000/leave/get", {
          headers: { token },
        });

        if (response.data.leaves) {
          setRequests(response.data.leaves);
        }
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="bg-[#1D2135] text-white px-8 py-8 rounded-xl shadow-lg w-full transform -translate-x-9.5">
      <h2 className="text-lg font-semibold mb-4 pt-4">Recent Requests</h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-400">No leave requests found.</p>
      ) : (
        <div className="space-y-3">
          {requests.map((request, index) => (
            <div key={index} className="bg-[#363B58] py-8 px-8 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-lg pb-1 font-semibold">{request.leaveType}</h3>
                <p className="text-xs text-gray-400">
                  {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-sm ${statusColors[request.status]}`}>
                {request.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentRequests;
