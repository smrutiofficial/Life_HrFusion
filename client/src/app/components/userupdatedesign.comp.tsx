"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { backend_link } from "../constants/constant";

const UserDetails = ({
  infobtn,
  setInfobtn,
}: {
  infobtn: boolean;
  setInfobtn: Dispatch<SetStateAction<boolean>>;
}) => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id"); // Get 'id' from query params

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    contact: "",
    role: "",
    position: "",
    department: "",
    status: "",
    joinedDate: "",
    experience: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    aadhar: "",
    pan: "",
  });

  useEffect(() => {
    if (!userId) return;

    // Fetch user profile data
    axios
      .get(`${backend_link}/profile/${userId}`)
      .then((response) => {
        const data = response.data;
        setFormData({
          fullName: data.userId.name || "",
          username: data.userId.username || "",
          email: data.userId.email || "",
          contact: data.contactNumber || "",
          role: data.userId.role || "",
          position: data.position || "",
          department: data.department || "",
          status: data.status || "",
          joinedDate: data.joinedDate || "",
          experience: data.experience ? data.experience.toString() : "",
          dob: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
          gender: data.gender || "",
          maritalStatus: data.maritalStatus || "",
          aadhar: data.aadharCard || "",
          pan: data.panCard || "",
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        name: formData.fullName,
        email: formData.email,
        role: formData.role,
        position: formData.position,
        department: formData.department,
        contactNumber: formData.contact,
        dateOfBirth: formData.dob,
        gender: formData.gender,
        maritalStatus: formData.maritalStatus,
        aadharCard: formData.aadhar,
        panCard: formData.pan,
        experience: parseInt(formData.experience) || 0,
        joinedDate: formData.joinedDate,
      };
      console.log(updatedData);

      await axios.put(
        `${backend_link}/profile/employee/${userId}`,
        updatedData
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const closebtn = ({}) => {
    setInfobtn(false);
  };

  return (
    <div className="w-full bg-[#1D2135] text-white p-8 flex justify-center relative">
      <div
        onClick={closebtn}
        className="absolute right-0 px-6 py-2 bg-[#EB6B6B] transform -translate-x-12 cursor-pointer rounded-md"
      >
        x Close
      </div>
      <div className="w-full p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Employee Details</h2>

        {/* Personal Information */}
        <Section title="Personal Information">
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Contact Number"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </Section>

        {/* Employment Details */}
        <Section title="Employment Details">
          <Input
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
          <Input
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
          <Input
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
          <Input
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </Section>

        {/* Work Information */}
        <Section title="Work Information">
          <Input
            label="Joined Date"
            name="joinedDate"
            type="date"
            value={formData.joinedDate}
            onChange={handleChange}
          />
          <Input
            label="Experience (Years)"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
        </Section>

        {/* Additional Details */}
        <Section title="Additional Details">
          <Input
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />
          <Input
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
          <Input
            label="Marital Status"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
          />
        </Section>

        {/* Document Information */}
        <Section title="Document Information">
          <Input
            label="Aadhar Card Number"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
          />
          <Input
            label="PAN Card Number"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
          />
        </Section>

        {/* Save Button */}
        <div className="flex justify-end mt-12">
          <button
            onClick={handleSaveChanges}
            className="bg-[#897EEF] hover:bg-[#655dac] px-12 py-4 rounded-lg font-medium flex items-center"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: any;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-[#363B58] py-4 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <h3 className="text-xl text-gray-400 mt-6 mb-2 py-4">{title}</h3>
      <div className="grid grid-cols-2 gap-4 text-gray-500">{children}</div>
    </div>
  );
}
