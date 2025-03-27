import React, { useState } from "react";
import { CheckCircle, XCircle, Clock, Calendar } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { backend_link } from "@/app/constants/constant";

const summaryData = [
  {
    label: "Present Days",
    value: 18,
    icon: <CheckCircle className="text-[#97BA8B]" />,
    bg: "bg-[#363B58]",
  },
  {
    label: "Absent Days",
    value: 2,
    icon: <XCircle className="text-[#EB6B6B]" />,
    bg: "bg-[#363B58]",
  },
  {
    label: "Late Arrivals",
    value: 3,
    icon: <Clock className="text-[#efd57e]" />,
    bg: "bg-[#363B58]",
  },
  {
    label: "Leave Days",
    value: 1,
    icon: <Calendar className="text-[#897EEF]" />,
    bg: "bg-[#363B58]",
  },
];

const AttendanceSummary: React.FC = () => {
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // Function to get user's location
  const getLocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject("Failed to get location. Please enable location services.");
          }
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  };

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      // Get current timestamp
      const checkInTimestamp = new Date().toISOString();

      // Get user location
      const location = await getLocation();

      // API call
      const response = await axios.put(
        `${backend_link}/attendance/today/checkin/me`,
        {
          checkIn: checkInTimestamp,
          location,
        },
        {
          headers: { token },
        }
      );

      // Update UI with check-in time
      setCheckInTime(
        new Date(response.data.checkIn).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    // 🔄 Force a full page reload
    window.location.reload();
    } catch (err: any) {
      setError(err.message || "Failed to check in");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      // Get current timestamp
      const checkOutTimestamp = new Date().toISOString();

      // Get user location
      // const location = await getLocation();

      // API call
      const response = await axios.put(
        `${backend_link}/attendance/today/checkout/me`,
        {
          checkOut: checkOutTimestamp,
        },
        {
          headers: { token },
        }
      );

      // Update UI with check-out time
      setCheckOutTime(
        new Date(response.data.checkOut).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      // 🔄 Force a full page reload
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Failed to check out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative px-25 py-14">
      <h3 className="text-2xl font-bold text-white mb-6">
        <span className="text-[#897EEF]">Attendance</span> Summary
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className={`${item.bg} flex items-center p-4 rounded-lg shadow-md`}
          >
            <div className="text-2xl">{item.icon}</div>
            <div className="ml-4">
              <p className="text-gray-400 text-sm">{item.label}</p>
              <p className="text-white text-xl font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-[4rem] mt-8 flex gap-4 justify-evenly items-center">
        <div
          onClick={handleCheckIn}
          className="w-[40%] h-full bg-[#97BA8B]/30 cursor-pointer hover:bg-[#97BA8B] hover:text-white text-green-200 font-bold flex justify-center items-center rounded-lg"
        >
          {loading ? "Checking In..." : "Check In"}
        </div>
        <div
          onClick={handleCheckOut}
          className="w-[40%] h-full bg-[#EB6B6B]/30 hover:bg-[#EB6B6B] hover:text-white cursor-pointer text-red-200 font-bold flex justify-center items-center rounded-lg"
        >
          {loading ? "Checking Out..." : "Check Out"}
        </div>
      </div>

      {/* Display Check-in & Check-out Times
      <div className="mt-4 text-center">
        <p className="text-gray-400">Check-in Time: {checkInTime || "--:-- PM"}</p>
        <p className="text-gray-400">Check-out Time: {checkOutTime || "--:-- PM"}</p>
      </div> */}

      {error && <p className="text-red-400 mt-4">{error}</p>}
    </div>
  );
};

export default AttendanceSummary;
