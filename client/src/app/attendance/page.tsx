"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Bgcomp from "../components/bg.comp";
import Logocomp from "../components/logo.comp";
import Image from "next/image";
import myself from "../../images/selfpngbg.jpg";
import AttendanceTrends from "../components/attendance/graph.comp";
import AttendanceSummary from "../components/attendance/summey.comp";
import { FaHistory, FaDownload } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import Link from "next/link";
import Preloader from "../components/preload.comp";
import { backend_link } from "../constants/constant";

const Attendance = () => {
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState(null);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure token is stored in localStorage
        if (!token) throw new Error("No authentication token found");

        const response = await axios.get(
          `${backend_link}/attendance/today/get/me`,
          {
            headers: {
              token: `${token}`,
            },
          }
        );

        setAttendance(response.data);
      } catch (err) {
        console.error("Error fetching attendance:", err);
        setError(err.response?.data?.message || "Failed to fetch attendance");
        setAttendance(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);
  // get profile from user
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure token is stored in localStorage
        if (!token) throw new Error("No authentication token found");

        const response = await axios.get(`${backend_link}/profile/user/me`, {
          headers: {
            token: `${token}`,
          },
        });

        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching attendance:", err);
        setError(err.response?.data?.message || "Failed to fetch attendance");
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Bgcomp />
          <section className="w-full h-full overflow-scroll">
            <div className="flex items-end">
              <Logocomp />
              <div className="flex gap-3 pb-2">
                <Link href="/">
                  <p className="text-gray-400">Dashboard</p>
                </Link>
                <p className="text-gray-400">&gt;</p>
                <p>Attendance Tracking</p>
              </div>
            </div>

            <div className="h-[80%]">
              <div className="h-[30%] flex justify-between px-14 py-2 mt-4">
                {/* Profile Section */}
                <div className="w-[49.5%] h-full px-12 rounded-lg bg-[#1D2135]">
                  <div className="relative flex items-center gap-6 text-white p-4 rounded-lg w-full h-full shadow-md">
                    <div className="relative flex-shrink-0 w-30 h-30">
                      <Image
                        src={myself}
                        alt="Profile"
                        layout="fill"
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="relative flex flex-col ml-4">
                      <h2 className="text-xl font-bold text-[#897EEF] pb-2">
                        {profile.userId?.name}
                      </h2>
                      <p className="text-sm text-gray-400">
                        Employee ID: {profile.userId?.hrmsId}
                      </p>
                      <p className="text-sm text-gray-400">
                        {profile.position}
                      </p>
                      <p className="text-sm text-gray-400">
                        {profile.department}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Attendance Status */}
                <div className="w-[49.5%] h-full rounded-lg bg-[#1D2135]">
                  <div className="relative flex flex-col py-10 px-30 text-white rounded-lg w-full h-full shadow-md">
                    <h2 className="text-2xl font-semibold">Today's Status</h2>
                    {attendance ? (
                      <>
                        <div className="flex justify-between mt-2">
                          <div>
                            <p className="text-sm text-gray-400">
                              Check-in Time
                            </p>
                            <p className="text-lg font-bold text-[#97BA8B]">
                              {attendance.checkIn
                                ? new Date(
                                    attendance.checkIn
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : "--:-- PM"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">
                              Check-out Time
                            </p>
                            <p className="text-lg font-bold text-[#EB6B6B]">
                              {attendance.checkOut
                                ? new Date(
                                    attendance.checkOut
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : "--:-- PM"}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center">
                          <span
                            className={`w-3 h-3 rounded-full ${
                              attendance.status === "Present"
                                ? "bg-[#97BA8B]"
                                : "bg-red-400"
                            }`}
                          />
                          <span className="ml-2 text-sm">
                            {attendance.status || "Absent"}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between mt-2">
                          <div>
                            <p className="text-sm text-gray-400">
                              Check-in Time
                            </p>
                            <p className="text-lg font-bold text-gray-300">
                              --:-- PM
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">
                              Check-out Time
                            </p>
                            <p className="text-lg font-bold text-gray-300">
                              --:-- PM
                            </p>
                          </div>
                        </div>
                        <p className="text-red-300 mt-4">
                          {error || "No attendance record found"}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="h-[70%] flex justify-between px-14 py-2">
                <div className="w-[49.5%] h-full rounded-lg bg-[#1D2135]">
                  <AttendanceTrends />
                </div>
                <div className="w-[49.5%] h-full rounded-lg bg-[#1D2135]">
                  <AttendanceSummary />
                </div>
              </div>
            </div>

            <div className="h-20 flex justify-end px-14 items-center gap-4">
              <div className="bg-[#1D2135] flex justify-center items-center gap-4 w-70 h-12">
                <FaDownload />
                <p>Download Report</p>
              </div>
              <div className="bg-[#363B58] flex justify-center items-center gap-4 w-70 h-12">
                <FaHistory />
                <p>View History</p>
              </div>
              <div className="bg-[#363B58] flex justify-center items-center gap-4 w-70 h-12">
                <BsCalendar2DateFill />
                <p>Request Leave</p>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Attendance;
