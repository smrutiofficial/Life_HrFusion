import { FaFileDownload, FaCheckCircle, FaFileInvoice } from "react-icons/fa";

export default function QuickLinks() {
  const links = [
    { icon: <FaFileDownload className="text-[#897EEF]" />, text: "Download Reports" },
    { icon: <FaCheckCircle className="text-[#97BA8B]" />, text: "Approve Leaves" },
    { icon: <FaFileInvoice className="text-[#E8C16D]" />, text: "Generate Payslip" },
  ];

  return (
    <div className="h-full p-5 rounded-2xl w-full ">
      <h2 className="text-white font-semibold pt-4 pl-2 text-lg mb-4">Quick Links</h2>
      <div className="space-y-3">
        {links.map((link, index) => (
          <div
            key={index}
            className="flex items-center bg-[#363B58] p-3 rounded-lg cursor-pointer transition hover:bg-[#484e75]"
          >
            <div className="p-2 bg-opacity-20 rounded-md">{link.icon}</div>
            <p className="text-gray-300 ml-3 font-medium">{link.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
