"use client";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { FaTransgender } from "react-icons/fa";
import { GiLoveMystery } from "react-icons/gi";

const Personalcomp = ({profile}) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    dob: "",
    gender: "",
    maritalStatus: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
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
          <label
            className="text-sm text-[#BDC2E3] opacity-45 flex gap-2 items-center"
          >
            <IoMdMail/>
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="example@xyz.com"
            disabled
            className="w-full mt-1 py-4 px-6 bg-[#363B58] rounded-md mb-2 outline-none"
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
            value={profile.contactNumber}
            onChange={handleChange}
            disabled
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
            value={profile?.dateOfBirth ? new Date(profile.dateOfBirth).toISOString().split("T")[0] : ""}
            onChange={handleChange}
            disabled
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
            value={profile.gender}
            onChange={handleChange}
            disabled
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
            value={profile.maritalStatus}
            onChange={handleChange}
            disabled
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

        {/* Submit Button
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-4"
        >
          Submit
        </button> */}
      </form>
    </div>
  );
};

export default Personalcomp;
