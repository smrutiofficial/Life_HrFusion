import Image from "next/image";
import React from "react";
import profile1 from "../../images/profile1.jpg";
import profile2 from "../../images/profile2.jpg";
import profile3 from "../../images/profile3.jpg";
import profile4 from "../../images/profile4.jpg";
import profile5 from "../../images/profile5.jpg";

const Pdatacomp = () => {
  return (
    <div className="bg-[#1D2135] border-gray-500 w-full h-full rounded-xl flex flex-col gap-4 border">
      <div className="flex justify-evenly h-full border-gray-400 rounded-xl flex-col px-8 py-5">
        <p className="font-medium text-lg text-gray-400 text-left">
          Leave Requests
        </p>
        <div className="flex flex-wrap gap-7 pt-2 w-full items-center overflow-scroll h-[9rem]">
          <div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden">
            <Image
              alt=""
              className="w-full h-full object-cover"
              src={profile1}
            />
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden">
            <Image
              alt=""
              className="w-full h-full object-cover"
              src={profile2}
            />
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden">
            <Image
              alt=""
              className="w-full h-full object-cover"
              src={profile3}
            />
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden">
            <Image
              alt=""
              className="w-full h-full object-cover"
              src={profile4}
            />
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden">
            <Image
              alt=""
              className="w-full h-full object-cover"
              src={profile5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pdatacomp;
