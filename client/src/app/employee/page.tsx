"use client";
import { useEffect, useState } from "react";
import Bgcomp from "../components/bg.comp";
import Logocomp from "../components/logo.comp";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import EmployeeCard from "../components/employeecard.comp";
import Pagination from "../components/Pagination.comp";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { backend_link } from "../constants/constant";

interface Employee {
  name: string;
  role: string;
  contactNumber: string;
  department: string;
  email: string;
  status: "active" | "inactive";
  imageUrl: string;
}

const Employee = () => {

const [userData, setUserData] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        const response = await axios.get(`${backend_link}/profile/user/all`, {
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
  }, [userData]); // Run only once on component mount


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
            <p className="">Employees_Managemet</p>
          </div>
        </div>
     

        {/* border */}
        <div className="h-[8%] flex items-center my-4">
          <div className="flex w-[80%] flex-col justify-center">
            <p className="px-14 text-2xl font-medium text-gray-200 pb-1">
              Employees Managemet
            </p>
            <p className="px-14 text-gray-400">
              A list of all employees in your organiation including their
              details.
            </p>
          </div>
          <div className="w-[20%] px-14">
            <div className="w-full bg-[#1D2135] border border-gray-400 flex justify-center items-center h-12 gap-4">
            <IoMdAdd className="text-gray-300"/>
              <p className="text-gray-300">Add Employee</p>
            </div>
          </div>
        </div>
        {/* search ... */}
        <div className="w-full px-12 h-[8%] flex justify-between items-center gap-4">
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
      

        <div className="px-12 flex flex-row flex-wrap gap-4 py-4">
          {userData.map((employee, index) => (
            <EmployeeCard key={index} {...employee} />
          ))}
        </div>
        {/* ---------------------------------------- */}
        <hr className="text-gray-400 mx-14" />
        <div className="p-10">
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

export default Employee;
