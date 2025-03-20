import React from "react";

const AdminBtnscomp = () => {
  return (
    <div className="flex justify-between items-center w-full h-full">
      <div className="bg-[#1D2135] flex justify-center items-center hover:bg-[#897EEF] border border-gray-500 w-[31.5%] h-[90%] rounded-xl">
        <p className="font-semibold text-lg text-gray-300">Employee Management</p>
      </div>
      <div className=" bg-[#1D2135] flex justify-center items-center hover:bg-[#897EEF] border border-gray-500 w-[31.5%] h-[90%] rounded-xl">
        <p className="font-semibold text-lg text-gray-300">Payroll Management</p>
      </div>
      <div className="bg-[#1D2135] flex justify-center items-center hover:bg-[#897EEF] border border-gray-500 w-[31.5%] h-[90%] rounded-xl">
        <p className="font-semibold text-lg text-gray-300">Department Management</p>
      </div>
    </div>
  );
};

export default AdminBtnscomp;
