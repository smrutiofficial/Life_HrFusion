"use client";
import { FaFileInvoiceDollar, FaWallet } from "react-icons/fa6";

const deductions = [
  { id: 1, name: "Provident Fund", amount: 425.0, icon: <FaWallet /> },
  { id: 2, name: "Professional Tax", amount: 200.0, icon: <FaFileInvoiceDollar /> },
  { id: 3, name: "Income Tax", amount: 650.0, icon: <FaFileInvoiceDollar /> },
];

const Deductions = () => {
  return (
    <div className="p-14 h-full rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium pl-8 text-gray-400">Deductions</h3>
      </div>

      {/* Deduction Items */}
      <div className="space-y-2 px-8">
        {deductions.map((deduction) => (
          <div
            key={deduction.id}
            className="flex justify-between items-center py-6 px-14 bg-[#363B58] rounded-lg text-gray-300 mb-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg text-gray-400">{deduction.icon}</span>
              <span>{deduction.name}</span>
            </div>
            <span className="text-gray-200">${deduction.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deductions;
