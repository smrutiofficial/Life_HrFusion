"use client";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { FaTransgender } from "react-icons/fa";
import { GiLoveMystery } from "react-icons/gi";
import { MdSecurity } from "react-icons/md";
import { FaAddressCard, FaIdCardAlt } from "react-icons/fa";
// import { IoEyeOff, IoEye } from "react-icons/io5";
import axios from "axios";
import { backend_link } from "../constants/constant";

const Personalcomp = ({ profile }) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    aadharCard: "",
    panCard: "",
  });

  // Ensure useEffect only updates if profile is available
  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      setFormData({
        email: profile.email || "",
        phone: profile.contactNumber || "",
        dob: profile.dateOfBirth
          ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: profile.gender || "",
        maritalStatus: profile.maritalStatus || "",
        aadharCard: profile.aadharCard || "",
        panCard: profile.panCard || "",
      });
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, phone, dob, ...rest } = formData;
  
      const updatedData = {
        contactNumber: phone, 
        dateOfBirth: dob, 
        ...rest,
      };
  
      const token = localStorage.getItem("token");
  
      if (!token) {
        alert(`User not authenticated`);
        return;
      }
  
      const response = await axios.put(
        `${backend_link}/profile/update`,
        updatedData,
        {
          headers: {
            token: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      alert("Profile updated successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="py-8 px-14">
      <h2 className="text-xl font-semibold mb-8 flex items-center gap-4">
        <FaUserCircle className="text-[#897EEF]" />
        Personal Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm text-[#BDC2E3] opacity-45 flex gap-2 items-center">
            <IoMdMail />
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            onChange={handleChange}
            placeholder="example@xyz.com"
            className="w-full mt-1 py-4 px-6 bg-[#363B58] text-gray-400 rounded-md mb-2 outline-none"
            required
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="text-sm text-[#BDC2E3] opacity-45 flex gap-2 items-center">
            <FaPhone />
            Contact Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-1 py-4 px-6 bg-[#363B58] rounded-md mb-2"
            pattern="[0-9]{10,12}"
            placeholder="+91 9861 955 265"
            required
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="text-sm text-[#BDC2E3] opacity-45 flex gap-2 items-center">
            <MdOutlineDateRange />
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full mt-1 py-4 px-6 bg-[#363B58] rounded-md mb-2"
            required
          />
        </div>

        {/* Gender Dropdown */}
        <div>
          <label className="text-sm text-[#BDC2E3] opacity-45 flex gap-2 items-center">
            <FaTransgender />
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full mt-1 py-4 px-6 bg-[#363B58] rounded-md mb-2"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Marital Status Dropdown */}
        <div>
          <label className="text-sm flex gap-2 items-center text-[#BDC2E3] opacity-45">
            <GiLoveMystery />
            Marital Status
          </label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="w-full mt-1 py-4 px-6 bg-[#363B58] rounded-md"
            required
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        {/* ----------------------------------------- */}

        <div className="py-8 ">
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
                  name="aadharCard"
                  onChange={handleChange}
                  value={formData.aadharCard}
                  className="w-full mt-1 py-3 px-5 bg-[#363B58] text-white rounded-md tracking-widest"
                />
                {/* <button
              type="button"
              onClick={() => setIsAadharVisible(!isAadharVisible)}
              className="absolute right-3 top-1/2 transform  -translate-y-1/2 text-gray-400"
            >
              {isAadharVisible ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button> */}
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
                  name="panCard"
                  onChange={handleChange}
                  value={formData.panCard}
                  className="w-full mt-1 py-3 px-5 bg-[#363B58] text-white rounded-md tracking-widest"
                />
                {/* <button
              type="button"
              onClick={() => setIsPanVisible(!isPanVisible)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
              {isPanVisible ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </button> */}
              </div>
            </div>
              <button
                onClick={handleSubmit}
                className="bg-[#897EEF] max-w-lg text-white my-12 px-14 rounded-md py-4 cursor-pointer flex justify-center items-center gap-4"
              >
                Update Profile
              </button>
          </form>
        </div>
      </form>
    </div>
  );
};

export default Personalcomp;
