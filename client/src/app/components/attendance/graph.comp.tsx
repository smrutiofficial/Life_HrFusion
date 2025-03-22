import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

const AttendanceTrends = () => {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Attendance",
        data: [8, 9, 8.5, 8.8],
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        fill: true,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#6366F1",
        pointRadius: 4,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: { color: "#CBD5E1" },
        grid: { color: "rgba(255,255,255,0.1)" },
      },
      x: {
        ticks: { color: "#CBD5E1" },
        grid: { display: false },
      },
    },
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false },
    },
  };

  return (
    <div className="p-14 h-full rounded-xl shadow-lg border border-gray-700">
      <h3 className="text-2xl font-bold text-[#897EEF]">Attendance Trends</h3>
      <div className="h-72 mt-4">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AttendanceTrends;
