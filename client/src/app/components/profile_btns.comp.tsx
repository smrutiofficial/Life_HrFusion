import React from "react";
import UpcomingEvents from "./events.comp";

const Profilebtns = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-[#1D2135] border border-gray-400 w-[96.5%] rounded-xl h-[93%] overflow-scroll">
      <UpcomingEvents/>
      </div>
    </div>
  );
};

export default Profilebtns;
