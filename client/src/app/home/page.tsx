import React from "react";
import Profilecomp from "../components/profile.comp";
import Statuscomp from "../components/status.comp";
import Profilebtns from "../components/profile_btns.comp";
import Pdatacomp from "../components/pdata.comp";
import Managementcomp from "../components/Management.comp";
import Payrollcomp from "../components/Payroll.comp";
import Notificationcomp from "../components/Notification.comp";

const Dashboard = () => {
  return (
    <div className="flex w-screen h-screen px-[2.5%] py-3">
      <div className="w-[75%]" style={{ height: "calc(100vh - 15%)" }}>
        <div className="flex-col relative h-[100%]">
          <div className="h-[55%]">
            {/* border */}
            <div className="flex w-full h-full">
              <div className="w-[22%]">
                {/* image */}
                <Profilecomp />
              </div>
              <div className="w-[78%]">
                <div className="w-full h-full">
                  <div className="h-[35%] flex justify-center items-center ">
                    {/* border */}
                    {/* status section */}
                    <Statuscomp />
                  </div>
                  <div className="h-[66.5%]">
                    {/* border */}
                    <div className="flex w-full h-full">
                      <div className="w-[65%] h-full ">
                        {/* border */}
                        {/* profile buttons */}
                        <Profilebtns />
                      </div>
                      <div className="w-[35%] py-3.5 pr-3">
                        {/* border */}
                        <Pdatacomp />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[45%]">
            {/* border */}
            {/* bottom part */}
            <div className="flex w-full h-full">
              <div className="w-[52%] h-full">
                {/* border */}
                {/* bl-1st */}
                <div className="w-full h-full flex items-center">
                  {/* border */}
                  <Managementcomp />
                </div>
              </div>
              <div className="w-[35%] h-full flex justify-center items-center">
                {/* border */}
                {/* br-2nd */}
                <Payrollcomp />
              </div>
              <div className="w-[12%] h-full flex justify-center items-center">
                <div className="bg-[#1D2135] border border-gray-400 w-full h-[94%] rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -------------notifications -----------*/}
      <div className="w-[25%]" style={{ height: "calc(100vh - 15%)" }}>
        {/* border */}
        <Notificationcomp />
      </div>
    </div>
  );
};

export default Dashboard;
