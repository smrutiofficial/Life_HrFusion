"use client";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
// import { FiCalendar } from "react-icons/fi";
import axios from "axios";

const LeaveRequestForm = () => {
  const [leaveType, setLeaveType] = useState("Sick");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate || !reason) {
      alert("Please fill all fields.");
      return;
    }

    const requestData = {
      leaveType,
      startDate,
      endDate,
      reason,
    };

    setLoading(true);
    console.log(requestData);
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/leave/request", requestData, {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      });

      if (response.status === 200) {
        alert("Leave request submitted successfully!");
        setLeaveType("Sick");
        setStartDate("");
        setEndDate("");
        setReason("");
        setFiles([]);
      } else {
        alert(`Error: ${response.data.message || "Failed to submit request"}`);
      }
    } catch (error) {
      alert("Network error, please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#1D2135] text-white py-12 px-14 rounded-xl shadow-lg w-full">
      <h2 className="text-lg font-semibold mb-4">Request Leave</h2>

      {/* Leave Type & Dates */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-gray-400">Leave Type</label>
          <select
            className="w-full bg-[#363B58] p-3.5 rounded-lg mt-1 focus:ring focus:ring-blue-400"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option>Annual Leave</option>
            <option>Sick</option>
            <option>Casual Leave</option>
          </select>
        </div>

        <div className="flex gap-4">
          <div className="w-[50%]">
            <label className="text-sm text-gray-400">Start Date</label>
            <div className="flex items-center bg-[#363B58] p-3 rounded-lg mt-1">
              <input
                type="date"
                className="w-full bg-transparent outline-none"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              {/* <FiCalendar className="text-gray-400" /> */}
            </div>
          </div>
          <div className="w-[50%]">
            <label className="text-sm text-gray-400">End Date</label>
            <div className="flex items-center bg-[#363B58] p-3 rounded-lg mt-1">
              <input
                type="date"
                className="w-full bg-transparent outline-none"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              {/* <FiCalendar className="text-gray-400" /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Reason */}
      <div className="mb-4">
        <label className="text-sm text-gray-400">Reason</label>
        <textarea
          className="w-full bg-[#363B58] p-3 rounded-lg mt-1 resize-none focus:ring focus:ring-blue-400 h-40"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      {/* File Upload */}
      <div className="mb-4 border-2 border-gray-700 border-dashed rounded-lg p-6 text-center h-40">
        <input
          type="file"
          multiple
          className="hidden"
          id="file-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer border border-[#1D2135]">
          <FaCloudUploadAlt className="text-gray-400 text-2xl mx-auto" />
          <p className="text-sm text-gray-400">Drag and drop files here or click to browse</p>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-6">
        <button className="px-8 py-3 bg-gray-700 rounded-lg">Cancel</button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-8 py-3 bg-[#897EEF] hover:bg-[#9690d0] rounded-lg"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </div>
  );
};

export default LeaveRequestForm;
