"use client";
import { useEffect, useState } from "react";
import Bgcomp from "../components/bg.comp";
import Logocomp from "../components/logo.comp";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
// import EmployeeCard from "../components/employeecard.comp";
import Pagination from "../components/Pagination.comp";

import PayrollTable from "../components/payrolltable.comp";
import axios from "axios";
import { backend_link } from "../constants/constant";
import Preloader from "../components/preload.comp";
import PayrollPage from "../components/payroll/updatepayroll.comp";

const Payroll = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  // /payroll/role/all
  const [userData, setUserData] = useState<any[]>([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        const response = await axios.get(`${backend_link}/payroll/role/all`, {
          headers: {
            token: `${token}`, // Attach token in Authorization header
          },
        });
        setUserData(response.data); // Set user data
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Run only once on component mount

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

  const [modclobtn, setModclobtn] = useState(false);
  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <div
            className={`absolute w-screen h-screen z-10 ${
              modclobtn == true ? "flex" : "hidden"
            } justify-center items-center`}
          >
            <div className="w-full h-full backdrop-blur-lg bg-[#6455EB]/50 absolute"></div>
            <div className="w-[72%] h-[82%] bg-[#1D2135] relative rounded-2xl overflow-scroll">
              <Link
                href="/payroll"
                className="absolute right-0 mr-12 mt-12 bg-[#EB6B6B] py-2 px-6 rounded-sm cursor-pointer"
              >
                <button onClick={() => setModclobtn(false)} className=" ">
                  Close
                </button>
              </Link>
              <PayrollPage />
            </div>
          </div>

          {/* ------------------------------------------------------- */}
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
              <PayrollTable
                userpayrole={userData}
                modclobtn={modclobtn}
                setModclobtn={setModclobtn}
              />
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
      )}
    </>
  );
};

export default Payroll;
