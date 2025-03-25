"use client";
import { FaFileInvoiceDollar } from "react-icons/fa6";

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

const Alowances: React.FC<EmployeeDetailsCardProps> = ({ info }) => {
  return (
    <div className="p-14 h-full rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium pl-8 text-gray-400">Allowences</h3>
      </div>

      {/* Deduction Items */}
      <div className="space-y-2 px-8">
        {info?.payroll?.allowances?.map((deduction) => (
          <div
            key={deduction._id}
            className="flex justify-between items-center py-6 px-14 bg-[#363B58] rounded-lg text-gray-300 mb-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg text-gray-400">
                <FaFileInvoiceDollar />
              </span>
              <span>{deduction.type}</span>
            </div>
            <span className="text-gray-200">
              ₹{deduction.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alowances;
