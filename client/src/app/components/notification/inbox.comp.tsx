"use client";
import { backend_link } from "@/app/constants/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { PiWarningOctagonFill } from "react-icons/pi";

export default function DashboardNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${backend_link}/notification/get/inbox`,
          {
            headers: {
              token: `${token}`,
            },
          }
        );

        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(
          `${backend_link}/notification/get/announcements`,
          {
            headers: {
              token: `${token}`,
            },
          }
        );

        setAnnouncements(response.data.announcements);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="px-4 py-6 flex flex-col gap-6 relative h-[99%]">
      {/* Inbox Section */}
      <div className="bg-[#1D2135] py-6 px-4 rounded-xl border h-[34%] border-gray-600 overflow-scroll">
        <div className="flex gap-4 items-center mb-4 px-2">
          <h2 className="text-white font-semibold text-lg">Inbox</h2>
          <span className="bg-[#EB6B6B] text-white text-xs h-5 w-5 flex justify-center items-center rounded-full">
            {notifications.length}
          </span>
        </div>

        <div className="space-y-3">
          {/* Notification 1 */}

          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div
                key={index}
                className="bg-[#363B58] p-3 rounded-lg flex items-center gap-4 px-8"
              >
                <span
                  className={`text-xl ${
                    notification.priority === "normal"
                      ? "text-[#97BA8B]" // Green for normal
                      : notification.priority === "urgent"
                      ? "text-[#EB6B6B]" // Yellow for urgent
                      : "text-[#E8C16D]" // Red for critical
                  }`}
                >
                  {notification.priority === "normal" ? (
                    <FaCircleCheck />
                  ) : notification.priority === "urgent" ? (
                    <PiWarningOctagonFill />
                  ) : (
                    <FaBell /> // Different color for "critical"
                  )}
                </span>

                <div>
                  <p className="text-white font-semibold">
                    {notification.tittle}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {notification.message}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm text-center">
              No new notifications
            </p>
          )}
        </div>
      </div>

      {/* Announcements Section */}
      <div className="bg-[#1D2135] py-7 px-4 rounded-xl border h-[66%] border-gray-600 overflow-scroll">
        {/* <h2 className="text-white font-semibold text-lg pl-2 mb-4">Announcements
          </h2> */}
        <div className="flex gap-4 items-center mb-4 px-2">
          <h2 className="text-white font-semibold text-lg">Announcements</h2>
          <span className="bg-[#EB6B6B] text-white text-xs h-5 w-5 flex justify-center items-center rounded-full">
            {announcements.length}
          </span>
        </div>

        <div className="space-y-3">
          {announcements.length > 0 ? (
            announcements.map((notification, index) => (
              <div
                key={index}
                className="bg-[#363B58] p-3 rounded-lg flex items-center gap-4 px-8"
              >
                <span
                  className={`text-xl ${
                    notification.priority === "normal"
                      ? "text-[#97BA8B]" // Green for normal
                      : notification.priority === "urgent"
                      ? "text-[#EB6B6B]" // Yellow for urgent
                      :  "text-[#E8C16D]"// Red for critical
                  }`}
                >
                  {notification.priority === "normal" ? (
                    <FaCircleCheck />
                  ) : notification.priority === "urgent" ? (
                    <PiWarningOctagonFill />
                  ) : (
                    <FaBell className="text-red-500" /> // Different color for "critical"
                  )}
                </span>

                <div>
                  <p className="text-white font-semibold">
                    {notification.tittle}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {notification.message}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm text-center">
              No new notifications
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
