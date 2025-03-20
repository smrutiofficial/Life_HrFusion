"use client";
import { useState } from "react";
import { MdSecurity } from "react-icons/md";
import { FaAddressCard, FaIdCardAlt } from "react-icons/fa";
import { IoEyeOff, IoEye } from "react-icons/io5";

const maskNumber = (num: string) => {
  if (!num) return "";
  const length = num.length;
  const visibleDigits = num.slice(-4); // Last 4 characters remain visible
  const maskedPart = "*".repeat(length - 4); // Replace only required characters
  return formatNumber(maskedPart + visibleDigits); // Ensure correct format
};

const formatNumber = (num: string) => {
  return num.replace(/(.{4})/g, "$1 "); // Inserts space every 4 chars
};

const Securitycomp = () => {
  const [formData, setFormData] = useState({
    aadhar: "123456781234", // Example Aadhar (12 digits)
    pan: "ABCDP1234Z", // Example PAN (10 characters)
  });

  const [isAadharVisible, setIsAadharVisible] = useState(false);
  const [isPanVisible, setIsPanVisible] = useState(false);

  return (
    <div className="py-8 px-14">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-white">
        <MdSecurity className="text-[#897EEF]" />
        Security Information
      </h2>

      <form className="space-y-5">
        {/* Aadhaar Card Input */}
        <div>
          <label className="text-sm text-[#BDC2E3] opacity-45 flex gap-2 items-center">
            <FaAddressCard />
            Aadhar Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              value={isAadharVisible ? formatNumber(formData.aadhar) : maskNumber(formData.aadhar)}
              className="w-full mt-1 py-3 px-5 bg-[#363B58] text-white rounded-md tracking-widest"
              readOnly
            />
            <button
              type="button"
              onClick={() => setIsAadharVisible(!isAadharVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {isAadharVisible ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
          </div>
        </div>

        {/* PAN Card Input */}
        <div>
          <label className="text-sm text-[#BDC2E3] opacity-45 flex gap-2 items-center">
            <FaIdCardAlt />
            Pan Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              value={isPanVisible ? formatNumber(formData.pan) : maskNumber(formData.pan)}
              className="w-full mt-1 py-3 px-5 bg-[#363B58] text-white rounded-md tracking-widest"
              readOnly
            />
            <button
              type="button"
              onClick={() => setIsPanVisible(!isPanVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {isPanVisible ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Securitycomp;
