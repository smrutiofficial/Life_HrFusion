import React from "react";
import Image from "next/image";
import Selfimg from "../../images/selfpngbg.jpg";
import cr from "../../images/cr.svg";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";

const Profilecomp = ({profile}) => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    router.push("/auth/login"); // Redirect to login page
  };
  return (
    <div className="w-full h-full flex justify-center items-center pr-3 pb-3 mt-1.5">
      <div className="w-full h-full bg-[#1D2135] border border-gray-400 rounded-xl relative overflow-hidden">
        <div className="absolute bg-[#1D2135] w-full h-[65%] top-0">
          {/* <Image alt="" src={Selfimg}></Image> */}
          <div className="py-4 px-8 flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-400 ">Profile</p>
            <button className="px-4 py-1.5 flex gap-4 justify-center items-center rounded-md bg-[#eb6b6b24] text-[#EB6B6B] cursor-pointer" onClick={handleLogout}>
              <BiLogOut className="text-xl" /><p>logout</p>
            </button>
          </div>
          <div className="h-[60%] w-full relative flex justify-center items-center">
            <Image className="rounded-full w-35 h-35" alt="" src={cr}></Image>
            <div className="w-28 h-28 absolute rounded-full overflow-hidden">
              <Image alt="" src={Selfimg} />
            </div>
          </div>
          <div className="flex flex-col relative">
            <p className=" pt-2 text-lg text-gray-200 text-center font-semibold">
            {profile.userId?.name}
            </p>
            <p className="pt-1 text[10px] text-center text-[#897EEF]">
              {profile.position}
            </p>
          </div>
        </div>
        <div className=" absolute w-full h-[35%] -bottom-8">
          <div className="w-[90%] py-2 h-[70%] mx-auto rounded-xl">
            <p className="text-center text-[#97BA8B] pb-3">
              {profile.experience} + years of experience
            </p>
            <div className="flex justify-evenly">
              <Link
                href="/profile"
                className="border border-dashed border-gray-500 w-[40%] rounded-md h-10 justify-center items-center flex cursor-pointer"
              >
                <button className=" cursor-pointer">Edit</button>
              </Link>
              <Link href="/profile" className="">
                <button className="relative inline-flex h-10 w-30 overflow-hidden rounded-md p-[3px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-[#] py-1 text-sm backdrop-blur-3xl font-semibold text-gray-200 px-6">
                    View
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilecomp;
