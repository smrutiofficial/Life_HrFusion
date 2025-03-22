"use client";

import React from "react";

const taxSlabs = [
  { range: "Up to ₹3,00,000", rate: "Nil", amount: "₹0" },
  { range: "₹3,00,001 - ₹6,00,000", rate: "5%", amount: "₹15,000" },
  { range: "₹6,00,001 - ₹9,00,000", rate: "10%", amount: "₹30,000" },
  { range: "₹9,00,001 - ₹12,00,000", rate: "15%", amount: "₹45,000" },
  { range: "₹12,00,001 - ₹15,00,000", rate: "20%", amount: "₹60,000" },
  { range: "Above ₹15,00,000", rate: "30%", amount: "₹Varies" }
];

const TaxSlabDetails = () => {
  return (
    <div className="w-full p-4 bg-[#1D2135] py-12 px-12 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-4">Tax Slab Details</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-white">
          <thead>
            <tr className="border-b border-gray-700 text-gray-300">
              <th className="p-3">Income Range</th>
              <th className="p-3">Tax Rate</th>
              <th className="p-3">Tax Amount</th>
            </tr>
          </thead>
          <tbody>
            {taxSlabs.map((slab, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="p-3">{slab.range}</td>
                <td className="p-3 text-gray-400">{slab.rate}</td>
                <td className="p-3 text-gray-400">{slab.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaxSlabDetails;
