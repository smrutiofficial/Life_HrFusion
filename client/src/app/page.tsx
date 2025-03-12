import Image from "next/image";
import grid from "../images/GRID.svg";

export default function Home() {
  return (
    <>
      <div className="-z-1 absolute w-screen h-screen bg">
        <Image className="absolute" alt="" src={grid}></Image>
        <div className="flex justify-between">
          <div className="h-screen w-50 bg-[#6455EB] blur-[100px]"></div>
          <div className="h-screen w-150 bg-[#6455EB] blur-[100px]"></div>
          <div className="h-screen w-50 bg-[#6455EB] blur-[100px]"></div>
        </div>
      </div>
      {/* ----------------------------------------------- */}
      <div className="pt-6 px-8 w-max">
        <p className="text-[20px] font-medium text-right p-0 -mb-2.5">Admin</p>
        <p className="text-[32px] font-bold">
          Life <span className="text-[#897EEF]">Hrfusion</span>
        </p>
      </div>
      {/* ------------------------------ */}
      <div className="flex w-screen h-screen px-[1.7%] py-3">
        <div className="w-[75%]" style={{ height: "calc(100vh - 15%)" }}>
          <div className="flex-col relative h-[100%]">
            <div className="h-[55%] border">
              <div className="flex w-full h-full">
                <div className="w-[25%]">{/* image */}</div>
                <div className="w-[75%]">
                  <div className="w-full h-full">
                    <div className="h-[35%] border "></div>
                    <div className="h-[65%] border">
                      <div className="flex w-full h-full">
                        <div className="w-[25%] border"></div>
                        <div className="w-[75%] border"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[45%] border">
              {/* bottom part */}
              <div className="flex w-full h-full">
              <div className="border w-[65%] h-full">
                {/* bl-1st */}
                <div className="flex-col w-full h-full">
                  <div className="w-full h-[35%] border"></div>
                  <div className="w-full h-[65%] border"></div>
                </div>
              </div>
              <div className="border w-[35%] h-full">
                {/* br-2nd */}
              </div>
              </div>
            </div>
          </div>
        </div>
        {/* -------------notifications */}
        <div
          className="w-[25%] border"
          style={{ height: "calc(100vh - 15%)" }}
        ></div>
      </div>
    </>
  );
}
