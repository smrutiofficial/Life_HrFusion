"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const TaxForm = ({ onTaxDataChange }) => {
 
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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const calculateAndSubmit = async () => {
      const annualSalary = parseFloat(formData.annualSalary) || 0;
      const annualBonus = parseFloat(formData.annualBonus) || 0;
      const hra = parseFloat(formData.hra) || 0;
      const travelAllowance = parseFloat(formData.travelAllowance) || 0;
      const specialAllowance = parseFloat(formData.specialAllowance) || 0;
      const providentFund = parseFloat(formData.providentFund) || 0;
      const professionalTax = parseFloat(formData.professionalTax) || 0;
      const insurancePremium = parseFloat(formData.insurancePremium) || 0;

      const basicPay = annualSalary + annualBonus;
      const allowances = hra + travelAllowance + specialAllowance;
      const deductions = providentFund + professionalTax + insurancePremium;

      // Send updated values to the parent component
      const payload = { basicPay, allowances, deductions };
      onTaxDataChange(payload);
    };

    calculateAndSubmit();
  }, [formData, onTaxDataChange]);



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
        {/* <button
          // onClick={calculateAndSubmit}
          className="bg-[#897EEF] text-white px-6 py-6 rounded-lg mt-4"
        >
          Calculate Tax
        </button> */}
      </div>
    </div>
  );
};

export default TaxForm;
