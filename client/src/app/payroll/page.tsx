"use client";
import { useState } from "react";
import Bgcomp from "../components/bg.comp";
import Logocomp from "../components/logo.comp";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
// import EmployeeCard from "../components/employeecard.comp";
import Pagination from "../components/Pagination.comp";

import PayrollTable from "../components/payrolltable.comp";

const Payroll = () => {

  const [selectedDepartment, setSelectedDepartment] = useState("");

  const departments = [
    "All Departments",
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Operations",
  ];

  const [selectedFilter, setSelectedFilter] = useState("");

  const filters = ["All", "Active", "Inactive", "Pending"];
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const totalResults = 97;
  return (
    <>
      <Bgcomp />

      {/* section */}
      <section className="w-[100%] h-full overflow-scroll">
        <div className="flex items-end">
          <Logocomp />
          <div className="flex gap-3 pb-2">
            <Link href="/">
              <p className="text-gray-400">Dashboard</p>
            </Link>
            <p className="text-gray-400">&gt;</p>
            <p className="">Payroll_Managemet</p>
          </div>
        </div>

        {/* border */}
     
        {/* search ... */}
        <div className="w-full py-12 px-12 h-[8%] flex justify-between items-center gap-4">
          <div className="bg-[#363B58] border border-gray-500 h-12 w-[75%] relative">
            <IoSearch className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            <input
              type="text"
              className="w-full px-20 h-full text-lg outline-none"
              placeholder="Search employee ..."
            />
          </div>
          <div className="bg-[#363B58] border border-gray-500 h-12 w-[15%] flex items-center px-8">
            <select
              className="w-full bg-transparent text-gray-400 outline-none"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((dept, index) => (
                <option key={index} value={dept} className="text-black">
                  {dept}
                </option>
              ))}
            </select>
          </div>
          {/* ------------------------------------- */}
          <div className="bg-[#363B58] border border-gray-500 h-12 w-[10%] flex items-center px-8">
            <select
              className="w-full bg-transparent text-gray-400 outline-none"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="" disabled>
                Filter
              </option>
              {filters.map((filter, index) => (
                <option key={index} value={filter} className="text-black">
                  {filter}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* employees ................---------------------------- */}

        <div className="px-12 flex flex-row flex-wrap gap-8.5 py-2">
        <PayrollTable />
        </div>
        {/* ---------------------------------------- */}
        <hr className="text-gray-400 my-10 mx-14" />
        <div className="px-10">
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </section>
    </>
  );
};

export default Payroll;
