import Image from "next/image";
import { FaPhone, FaBuilding, FaEnvelope } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
interface EmployeeCardProps {
  name: string;
  role: string;
  contactNumber: string;
  department: string;
  email: string;
  status: "active" | "inactive";
  imageUrl: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  name,
  role,
  contactNumber,
  department,
  email,
  status,
  imageUrl,
}) => {
  return (
    <div className="relative bg-[#1E2133] text-white py-8 px-12 border border-gray-700 w-[444px] shadow-lg flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden">
          <Image src={imageUrl} alt={name} layout="fill" className="w-full h-full object-cover"/>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
        <span
          className={`px-3 py-1 text-sm rounded-md ${
            status === "active"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-1 px-2">
        <div className="flex items-center gap-3 text-gray-400">
          <FaPhone className="text-[#897EEF]" />
          <span>{contactNumber}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <FaBuilding className="text-[#897EEF]" />
          <span>{department}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <FaEnvelope className="text-[#897EEF]" />
          <span>{email}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end pt-2 items-center gap-4">
        <button className="text-white border py-2 w-[50%] rounded-lg bg-[#363B58] border-gray-500 flex gap-4 justify-center items-center cursor-pointer"><RiEdit2Fill />Edit</button>
        <button className="bg-[#897EEF] text-white w-[50%] py-2 rounded-md flex gap-4 justify-center items-center cursor-pointer">
        <MdDelete />Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
