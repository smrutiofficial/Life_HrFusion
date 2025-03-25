import React, { useEffect } from "react";

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

// type EmployeeDetailsCardProps = {
//   info: UserData[];
// };

const calculateTotalAllowances = (allowances: Allowance[]): number => {
  return allowances.reduce((total, allowance) => total + allowance.amount, 0);
};

const calculateTotalDeductions = (deductions: Deduction[]): number => {
  return deductions.reduce((total, deduction) => total + deduction.amount, 0);
};

const calculateNetSalary = (
  basicpay: number,
  allowances: Allowance[],
  deductions: Deduction[]
): number => {
  const totalAllowances = calculateTotalAllowances(allowances);
  const totalDeductions = calculateTotalDeductions(deductions);
  return basicpay + totalAllowances - totalDeductions;
};

const SalarySummary = ({
  info,
  onNetSalaryChange,
}: {
  info: UserData[];
  onNetSalaryChange: (netSalary: number) => void;
}) => {
  // Calculate the total net salary if multiple employees exist
  const totalNetSalary = info.reduce((sum, employee) => {
    const { basicpay, allowances, deductions } = employee.payroll;
    const totalAllowances = allowances.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    const totalDeductions = deductions.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    return sum + (basicpay + totalAllowances - totalDeductions);
  }, 0);

  // Update parent component when net salary changes
  useEffect(() => {
    onNetSalaryChange(totalNetSalary);
  }, [totalNetSalary, onNetSalaryChange]);

  return (
    <>
      {info.map((employee) => {
        const { basicpay, allowances, deductions } = employee.payroll;
        const totalAllowances = calculateTotalAllowances(allowances);
        const totalDeductions = calculateTotalDeductions(deductions);
        const netSalary = calculateNetSalary(basicpay, allowances, deductions);

        return (
          <div key={employee._id} className="mx-auto py-10 px-8 rounded-2xl">
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-4 pb-4 bg-gradient-to-r from-[#897EEF] to-[#4a00e0] text-transparent bg-clip-text">
                Salary Summary
              </h2>
              <table className="w-full border-collapse">
                <tbody>
                  <tr className="">
                    <td className="py-2 text-gray-500">Basic Pay</td>
                    <td className="text-right font-medium py-2">
                      ₹{basicpay.toLocaleString()}
                    </td>
                  </tr>
                  {allowances.map(({ type, amount, _id }) => (
                    <tr key={_id} className="">
                      <td className="py-2 text-gray-500">{type}</td>
                      <td className="text-right font-medium py-2 text-green-200">
                        ₹{amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className=" font-semibold">
                    <td className="py-2 text-gray-500">Total Allowances</td>
                    <td className="text-right py-2">
                      ₹{totalAllowances.toLocaleString()}
                    </td>
                  </tr>
                  {deductions.map(({ type, amount, _id }) => (
                    <tr key={_id} className="">
                      <td className="py-2 text-gray-500">{type}</td>
                      <td className="text-right font-medium py-2 text-red-200">
                        -₹{amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className=" font-semibold">
                    <td className="py-2 text-gray-500">Total Deductions</td>
                    <td className="text-right py-2">
                      -₹{totalDeductions.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 border-t pt-4 flex justify-between font-bold text-lg">
                <span className="text-gray-200 font-semibold">Net Salary</span>
                <span className="text-2xl">₹{netSalary.toLocaleString()}</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SalarySummary;
