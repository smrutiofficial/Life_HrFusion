"use client";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const SalaryChart = ({net}) => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Salary",
        data: [7800, 8000, 8100, 8200, 8350, 8500],
        borderColor: "#897EEF",
        backgroundColor: "rgba(52, 211, 153, 0.2)",
        fill: true,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#897EEF",
        pointRadius: 4,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 7000,
        max: 9000,
        ticks: { color: "#cacaca" }, // White text
        grid: { color: "rgba(255,255,255,0.1)" }, // Faint grid lines
      },
      x: {
        ticks: { color: "#cacaca" },
        grid: { display: false },
      },
    },
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false },
    },
  };

  return (
    <div className="px-14 py-14 h-full rounded-xl shadow-lg border border-gray-700">
      <h3 className="text-lg font-medium text-gray-400 text-center pb-4">Net Salary</h3>
      <p className="text-4xl font-bold text-center pb-4 bg-gradient-to-r from-[#897EEF] to-[#4a00e0] text-transparent bg-clip-text">₹{net}</p>
      <p className="text-sm text-[#897EEF] text-center pb-4">↑ 4.2% from last month</p>

      <div className="h-72 mt-6">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalaryChart;
