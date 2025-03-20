import React from 'react';
import Image from "next/image";
import grid from "../../images/GRID.svg";

const Bgcomp = () => {
  return (
    <div className="-z-1 absolute w-screen h-screen bg">
    <Image className="absolute" alt="" src={grid}></Image>
    <div className="flex justify-between">
      <div className="h-screen w-50 bg-[#6455EB] blur-[100px]"></div>
      <div className="h-screen w-150 bg-[#6455EB] blur-[100px]"></div>
      <div className="h-screen w-50 bg-[#6455EB] blur-[100px]"></div>
    </div>
  </div>
  )
}

export default Bgcomp;