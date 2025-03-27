"use client";
import { useState } from "react";
import { MdGroups, MdPersonalInjury } from "react-icons/md";
import { FaGlobeAmericas, FaSearch } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { backend_link } from "@/app/constants/constant";

export default function NotificationUI() {
  const [selectedRecipient, setSelectedRecipient] = useState("employees");
  const [message, setMessage] = useState("");
  const [tittle, setTittle] = useState("");
  const [priority, setPriority] = useState("normal");
  const [loading, setLoading] = useState(false);

  const getPriorityColor = () => {
    switch (priority) {
      case "normal":
        return "text-green-100 bg-[rgba(13,84,43,0.3)]";
      case "urgent":
        return "text-yellow-100 bg-[rgba(115,62,10,0.3)]";
      case "critical":
        return "text-red-100 bg-[rgba(130,24,26,0.3)]";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  const sendNotification = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!tittle || !message) {
      alert("Title and message are required!");
      return;
    }

    setLoading(true);

    const notificationData = {
      recipients: selectedRecipient,
      tittle,
      message,
      priority,
    };

    try {
      const response = await fetch(`${backend_link}/notification/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token, // Replace with actual token
        },
        body: JSON.stringify(notificationData),
      });

      if (response.ok) {
        alert("Notification sent successfully!");
        setTittle("");
        setMessage("");
        setPriority("normal");
        setSelectedRecipient("employees");
      } else {
        alert("Failed to send notification");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Error sending notification. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1D2135] py-14 px-18 text-white p-6 rounded-lg w-full max-w-6xl">
      <h2 className="text-xl font-medium text-gray-300 mb-4">Recipients</h2>
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-6 py-2 rounded flex justify-center items-center gap-4 ${
            selectedRecipient === "employees" ? "bg-[#897EEF]" : "bg-[#363B58]"
          }`}
          onClick={() => setSelectedRecipient("employees")}
        >
          <MdGroups className="text-2xl" />
          All Employees
        </button>
        <button
          className={`px-6 py-2 rounded flex justify-center items-center gap-4 ${
            selectedRecipient === "hr" ? "bg-[#897EEF]" : "bg-[#363B58]"
          }`}
          onClick={() => setSelectedRecipient("hr")}
        >
          <MdPersonalInjury />
          All HRs
        </button>
        <button
          className={`py-2 rounded flex justify-center items-center gap-4 px-6 ${
            selectedRecipient === "everyone" ? "bg-[#897EEF]" : "bg-[#363B58]"
          }`}
          onClick={() => setSelectedRecipient("everyone")}
        >
          <FaGlobeAmericas />
          Everyone
        </button>
      </div>

      <h3 className="text-lg font-medium text-gray-300 mb-2 mt-6">Title</h3>
      <div className="w-full h-16 rounded-lg flex flex-row bg-[#363B58] justify-center items-center overflow-hidden mb-4 px-10 gap-4">
        <input
          type="text"
          value={tittle}
          placeholder="Enter title..."
          className="w-full h-full rounded outline-none bg-transparent text-white"
          onChange={(e) => setTittle(e.target.value)}
        />
      </div>

      <h3 className="text-lg font-medium text-gray-300 mb-2">Message</h3>
      <textarea
        className="w-full px-12 py-6 h-40 bg-[#363B58] rounded-lg outline-none mb-4 resize-none text-white"
        placeholder="Type your notification message here..."
        maxLength={500}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <h3 className="text-lg font-semibold px-2 text-gray-300 mb-2">Priority</h3>
      <div className="flex space-x-4 mb-6 px-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="priority"
            value="normal"
            className="accent-[#97BA8B]"
            checked={priority === "normal"}
            onChange={() => setPriority("normal")}
          />
          <span>Normal</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="priority"
            value="urgent"
            className="accent-[#E8C16D]"
            checked={priority === "urgent"}
            onChange={() => setPriority("urgent")}
          />
          <span>Urgent</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="priority"
            value="critical"
            className="accent-[#EB6B6B]"
            checked={priority === "critical"}
            onChange={() => setPriority("critical")}
          />
          <span>Critical</span>
        </label>
      </div>

      <div className="bg-[#363B58] p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-300 mb-6">Preview</h3>
        <div className="border px-6 py-4 rounded-xl border-gray-500">
          <div className="flex items-center space-x-2 p-2 rounded-lg w-fit ">
            <span className={`px-6 py-1 rounded-lg ${getPriorityColor()}`}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
            <span>To: {selectedRecipient}</span>
          </div>
          <p className="mt-2 text-gray-300 px-4 pb-2 text-lg font-semibold">
            {tittle || "Preview notification title"}
          </p>
          <p className="mt-2 text-gray-300 px-4 pb-6">
            {message || "Your notification message will appear here..."}
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-8">
        <button className="px-10 py-3 bg-[#363B58] rounded-md">Cancel</button>
        <button
          className="px-10 py-3 flex justify-center items-center gap-3 bg-[#897EEF] rounded-md"
          onClick={sendNotification}
          disabled={loading}
        >
          {loading ? "Sending..." : <BsFillSendFill className="text-xl" />}
          Send Notification
        </button>
      </div>
    </div>
  );
}
