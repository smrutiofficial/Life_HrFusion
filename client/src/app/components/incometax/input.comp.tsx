"use client";

import { useState } from "react";

const TaxForm = () => {
  const [formData, setFormData] = useState({
    financialYear: "2023-24",
    taxRegime: "New Regime",
    annualSalary: "",
    annualBonus: "",
    hra: "",
    travelAllowance: "",
    specialAllowance: "",
    providentFund: "",
    professionalTax: "",
    insurancePremium: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-none text-white p-6">
      <div className="w-full flex flex-col gap-4">
        <section className="bg-[#1D2135] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-gray-400 block text-sm mb-1">
                Financial Year
              </label>
              <select
                name="financialYear"
                value={formData.financialYear}
                onChange={handleChange}
                className="w-full py-4 px-10 bg-[#363B58] rounded"
              >
                <option>2023-24</option>
                <option>2024-25</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-gray-400 block text-sm mb-1">
                Tax Regime
              </label>
              <select
                name="taxRegime"
                value={formData.taxRegime}
                onChange={handleChange}
                className="w-full py-4 px-10 bg-[#363B58] rounded"
              >
                <option>New Regime</option>
                <option>Old Regime</option>
              </select>
            </div>
          </div>
        </section>

        <section className="bg-[#1D2135] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Income Details</h2>
          <div className="mb-4">
            <label className="text-gray-400 block text-sm mb-1">
              Annual Salary
            </label>
            <input
              type="text"
              name="annualSalary"
              value={formData.annualSalary}
              placeholder="₹ 0.0"
              onChange={handleChange}
              className="w-full px-10 py-4 bg-[#363B58] rounded-lg"
            />
          </div>
          <div>
            <label className="text-gray-400 block text-sm mb-1">
              Annual Bonus
            </label>
            <input
              type="text"
              name="annualBonus"
              value={formData.annualBonus}
              placeholder="₹ 0.0"
              onChange={handleChange}
              className="w-full px-10 py-4 bg-[#363B58] rounded-lg"
            />
          </div>
        </section>

        <section className="bg-[#1D2135] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Allowances</h2>
          <div className="mb-4">
            <label className="text-gray-400 block text-sm mb-1">
              House Rent Allowance (HRA)
            </label>
            <input
              type="text"
              name="hra"
              value={formData.hra}
              placeholder="₹ 0.0"
              onChange={handleChange}
              className="w-full py-4 px-10 bg-[#363B58] rounded-md "
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-400 block text-sm mb-1">
              Travel Allowance
            </label>
            <input
              type="text"
              name="travelAllowance"
              value={formData.travelAllowance}
              placeholder="₹ 0.0"
              onChange={handleChange}
              className="w-full py-4 px-10 bg-[#363B58] rounded-md "
            />
          </div>
          <div>
            <label className="text-gray-400 block text-sm mb-1">
              Special Allowance
            </label>
            <input
              type="text"
              name="specialAllowance"
              value={formData.specialAllowance}
              placeholder="₹ 0.0"
              onChange={handleChange}
              className="w-full py-4 px-10 bg-[#363B58] rounded-md "
            />
          </div>
        </section>

        <section className="bg-[#1D2135] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Deductions</h2>
          <div className="mb-4">
            <label className="text-gray-400 block text-sm mb-1">
              Provident Fund (PF)
            </label>
            <input
              type="text"
              name="providentFund"
              value={formData.providentFund}
              placeholder="₹ 0.0"
              onChange={handleChange}
              className="w-full py-4 px-10 bg-[#363B58] rounded-md "
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-400 block text-sm mb-1">
              Professional Tax
            </label>
            <input
              type="text"
              name="professionalTax"
              value={formData.professionalTax}
              placeholder="₹ 0.0"
              onChange={handleChange}
              className="w-full py-4 px-10 bg-[#363B58] rounded-md "
            />
          </div>
          <div>
            <label className="text-gray-400 block text-sm mb-1">
              Insurance Premium
            </label>
            <input
              type="text"
              name="insurancePremium"
              value={formData.insurancePremium}
              placeholder="₹ 0.0"
              onChange={handleChange}
              className="w-full py-4 px-10 bg-[#363B58] rounded-md "
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default TaxForm;
