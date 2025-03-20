import React from "react";
import Image from "next/image";
import Selfimg from "../../images/selfpngbg.jpg";
import cr from "../../images/cr.svg";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";

const Profilecomp = () => {
  return (
    <div className="w-full h-full flex justify-center items-center pr-3 pb-3 pt-2">
      <div className="w-full h-full bg-[#1D2135] border border-gray-400 rounded-3xl relative overflow-hidden">
        <div className="absolute bg-[#1D2135] w-full h-[65%] top-0">
          {/* <Image alt="" src={Selfimg}></Image> */}
          <div className="py-4 px-8 flex justify-between">
            <p className="text-[18px]">Profile</p>
            <button><BiLogOut className="text-2xl"/></button>
          </div>
          <div className="h-[60%] w-full relative flex justify-center items-center">
            <Image className="rounded-full w-40 h-40" alt="" src={cr}></Image>
            <div className="w-30 h-30 absolute rounded-full overflow-hidden">
              <Image alt="" src={Selfimg} />
            </div>
          </div>
          <div className="flex flex-col relative">
            <p className=" pt-3 text-[20px] text-center font-semibold">
              Smruti Prakash Rout
            </p>
            <p className="pt-1 text[10px] text-center text-[#897EEF]">
              CEO & Founder
            </p>
          </div>
        </div>
        <div className=" absolute w-full h-[35%] -bottom-8">
          <div className="w-[90%] py-2 h-[70%] mx-auto rounded-xl">
            <p className="text-center text-[#97BA8B] pb-3">
              4+ years of experience
            </p>
            <div className="flex justify-evenly">
              <Link href="/profile" className="bg-[#363B58] w-[40%] rounded-md h-10 justify-center items-center flex">
              <button>Edit</button>
              </Link>
              <Link href="/profile" className="bg-[#897EEF] w-[40%] rounded-md h-10 flex justify-center items-center">
              <button >View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilecomp;
