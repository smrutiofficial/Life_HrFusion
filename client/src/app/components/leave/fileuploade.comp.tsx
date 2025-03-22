"use client"
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";

const LeaveRequestForm = () => {
  const [leaveType, setLeaveType] = useState("Annual Leave");
  const [duration, setDuration] = useState("");
  const [reason, setReason] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  return (
    <div className="bg-[#1D2135] text-white py-12 px-14 rounded-xl shadow-lg w-full">
      <h2 className="text-lg font-semibold mb-4">Request Leave</h2>

      {/* Leave Type & Duration */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm text-gray-400">Leave Type</label>
          <select
            className="w-full bg-[#363B58] p-3 rounded-lg mt-1 focus:ring focus:ring-blue-400 h-15"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option>Annual Leave</option>
            <option>Sick Leave</option>
            <option>Casual Leave</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-400">Duration</label>
          <div className="flex items-center bg-[#363B58] p-3 rounded-lg mt-1">
            <input
              type="text"
              placeholder="-/-/-"
              className="w-full h-9 bg-transparent outline-none"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <FiCalendar className="text-gray-400" />
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
        <input type="file" multiple className="hidden" id="file-upload" onChange={handleFileChange} />
        <label htmlFor="file-upload" className="cursor-pointer border border-[#1D2135]">
          <FaCloudUploadAlt className="text-gray-400 text-2xl mx-auto" />
          <p className="text-sm text-gray-400">Drag and drop files here or click to browse</p>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-6">
        <button className="px-8 py-3 bg-gray-700 rounded-lg">Cancel</button>
        <button className="px-8 py-3 bg-[#897EEF] hover:bg-[#9690d0] rounded-lg">
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default LeaveRequestForm;
