import React from "react";
import Bgcomp from "../components/bg.comp";
import Logocomp from "../components/logo.comp";
import Link from "next/link";
import Image from "next/image";
import Selfpic from "../../images/selfpngbg.jpg";
import { MdEdit } from "react-icons/md";
import Personalcomp from "../components/personal.comp";
import Securitycomp from "../components/Security.comp";


const Profile = () => {
  return (
    <>
      <Bgcomp />
      <div className="flex gap-4 items-end">
        <Logocomp />
        <div className="flex gap-3 pb-2">
          <Link href="/">
            <p className="text-gray-400">Dashboard</p>
          </Link>
          <p className="text-gray-400">&gt;</p>
          <p className="">Profile</p>
        </div>
      </div>
      {/* ----------------------------------------- */}
      <div className="flex-co h-[88%] px-14 py-6 overflow-scroll">
        <div className="h-[40%] w-full pb-2">
          <div className="bg-[#1D2135] w-full flex h-full rounded-2xl">
            {/* top leyer */}
            <div className="w-[15%] h-full flex justify-start items-center">
              {/* top 1st layer */}
              <div className="border-4 rounded-full ml-20 w-[60%] h-[60%] overflow-hidden">
                <Image src={Selfpic} alt="" />
              </div>
            </div>
            <div className="w-[55%] h-full flex items-center">
              {/* middle layer */}
              <div className="w-[85%] px-8">
                <p className="text-2xl font-semibold pb-4">Smruti Prakash rout</p>
                <div className="flex w-full gap-8">
                  <div className="w-[50%] flex flex-col gap-2">
                    <p className="text-[#A7ACCE]">User ID:
                      <span className="pl-4">smruti985</span>
                    </p>
                    <p className="text-[#A7ACCE]">Position:
                      <span className="pl-4">Senior Product designer</span>
                    </p>
                    <p className="text-[#A7ACCE]">Joined:
                      <span className="pl-4">March 15,2022</span>
                    </p>
                  </div>
                  <div className="w-[50%] flex flex-col gap-2">
                    <p className="text-[#A7ACCE]">HRMS ID:
                      <span className="pl-4">7685443</span>
                    </p>
                    <p className="text-[#A7ACCE]">Department:
                      <span className="pl-4">Design Team</span>
                    </p>
                  </div>
                </div>

              </div>
            </div>
            <div className="w-[30%] h-full flex flex-row justify-end pr-24 items-start py-18">
              {/* 3rd top layer */}
              <button className="bg-[#363B58] text-[#9198C2] px-14 rounded-md py-2 flex justify-center items-center gap-4"><MdEdit className="text-[#]" />Edit Profile</button>
            </div>
          </div>
        </div>
        <div className="h-max w-full py-4">
          <div className="w-full flex justify-between h-full rounded-2xl">
            <div className="bg-[#1D2135] rounded-xl w-[49.5%] h-full px-12 py-8">
              {/* bottom left */}
              <Personalcomp/>
            </div>
            <div className="bg-[#1D2135] rounded-xl w-[49.5%] h-full px-12 py-8 pb-14">
              {/* bottom right */}
              <Securitycomp/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
