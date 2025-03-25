import React from "react";
import { FaHistory } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
type Allowance = {
  type: string;
  amount: number;
  _id: string;
};

type Deduction = {
  type: string;
  amount: number;
  _id: string;
};

type Payroll = {
  _id: string;
  basicpay: number;
  bankac: string;
  ifsc: string;
  allowances: Allowance[];
  deductions: Deduction[];
  ctc: number;
};

type User = {
  _id: string;
  hrmsId: number;
  username: string;
  name: string;
  email: string;
  role: string;
};

type UserData = {
  _id: string;
  userId: User;
  position: string;
  status: string;
  department: string;
  joinedDate: string;
  contactNumber: string;
  experience: number;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  aadharCard: string;
  panCard: string;
  createdAt: string;
  updatedAt: string;
  payroll: Payroll;
};

type EmployeeDetailsCardProps = {
  info: UserData;
};

const EmployeeDetailsCard: React.FC<EmployeeDetailsCardProps> = ({ info }) => {
  return (
    <div className="text-white px-14 py-12 rounded-xl h-full w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Employee Info */}
        <div className="md:col-span-1 px-8 py-12">
          <h2 className="text-2xl font-bold pb-4 bg-gradient-to-r from-[#897EEF] to-[#4a00e0] text-transparent bg-clip-text">
            {info.userId.name}
          </h2>
          <p className="text-gray-400 pb-1">{info.position}</p>
          <p className="text-gray-400 pb-1">Employee ID: {info.userId.hrmsId}</p>
          <p className="text-gray-400 pb-1">Department: {info.department}</p>
          <p className="text-gray-400 pb-1">Join Date: {info.joinedDate}</p>
        </div>

        {/* Bank & Salary Info */}
        <div className="w-[200%]">
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <div className="bg-[#363B58] p-4 rounded-lg">
              <p className="text-gray-400">Bank Account</p>
              <p className="text-lg font-semibold">{info.payroll.bankac}</p>
              <p className="text-sm text-gray-500">HDFC Bank</p>
            </div>
            <div className="bg-[#363B58] p-4 rounded-lg">
              <p className="text-gray-400">IFSC Code</p>
              <p className="text-lg font-semibold ">{info.payroll.ifsc}</p>
              <p className="text-sm text-gray-500">Branch: Downtown</p>
            </div>
            <div className="bg-[#363B58] p-4 rounded-lg">
              <p className="text-gray-400">CTC (Annual)</p>
              <p className="text-lg font-semibold">₹{info.payroll.ctc}</p>
            </div>
            <div className="bg-[#363B58] p-4 rounded-lg">
              <p className="text-gray-400">EPF Number</p>
              <p className="text-lg font-semibold ">EPF087654321</p>
            </div>
            <div className="bg-[#363B58] p-4 rounded-lg col-span-2">
              <p className="text-gray-400">UAN</p>
              <p className="text-lg font-semibold ">100234567890</p>
            </div>
          </div>
          <div className="h-40 w-full flex flex-col justify-end gap-4">
            <p className="text-gray-500">Quick Action</p>
            <div className="h-14 flex justify-between">
              <div className="bg-[#363B58] rounded-lg w-[32%] h-full cursor-pointer flex justify-center items-center gap-3">
                <FaDownload />
                <p>Download Report</p>
              </div>
              <div className="bg-[#363B58] rounded-lg w-[32%] h-full cursor-pointer flex justify-center items-center gap-3">
                <FaHistory />
                <p>View History</p>
              </div>
              <div className="bg-[#363B58] rounded-lg w-[32%] h-full cursor-pointer flex justify-center items-center gap-3">
                <MdEmail  className="text-xl"/>
                <p>Email Payslip</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsCard;
