import { useState, useEffect } from "react";
import Profilecomp from "../components/profile.comp";
import Statuscomp from "../components/status.comp";
import Profilebtns from "../components/profile_btns.comp";
import Pdatacomp from "../components/pdata.comp";
import Managementcomp from "../components/Management.comp";
import Payrollcomp from "../components/Payroll.comp";
import Notificationcomp from "../components/Notification.comp";
import QuickLinks from "../components/quicklink.comp";
import axios from "axios";
import {backend_link} from "@/app/constants/constant";
import Preloader from "../components/preload.comp";
const Dashboard = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        const response = await axios.get(`${backend_link}/profile/user/me`, {
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

  return (
    <>
    {loading ? <Preloader /> : 
    <div className="flex w-screen h-screen px-[2.5%] py-3">
      <div className="w-[75%]" style={{ height: "calc(100vh - 15%)" }}>
        <div className="flex-col relative h-[100%]">
          <div className="h-[55%]">
            {/* border */}
            <div className="flex w-full h-full">
              <div className="w-[24%]">
                {/* image */}
                <Profilecomp profile={userData} />
              </div>
              <div className="w-[76%]">
                <div className="w-full h-full">
                  <div className="h-[35%] flex justify-center items-center ">
                    {/* border */}
                    {/* status section */}
                    <Statuscomp />
                  </div>
                  <div className="h-[66.5%]">
                    {/* border */}
                    <div className="flex w-full h-full">
                      <div className="w-[65%] h-[99%] overflow-hidden ">
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
              <div className="w-[45%] h-full">
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
              <div className="w-[20%] mr-2.5 h-full flex justify-center items-center">
                <div className="bg-[#1D2135] border border-gray-400 w-full h-[94%] rounded-xl">
                  <QuickLinks />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* -------------notifications -----------*/}
      <div className="w-[25%] py-2 mt-2.5" style={{ height: "calc(100vh - 17%)" }}>
        {/* border */}
        <Notificationcomp />
      </div>
    </div>
}
</>

  );
};

export default Dashboard;
