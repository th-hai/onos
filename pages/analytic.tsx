import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
);

export default function Analytic({ users }: { users: any[] }) {

    // Create a hook to update the chart
    const [chartData, setChartData] = React.useState(users);

    // Create a hook to update the chart
    useEffect(() => {
        setChartData(users);
    }, [users]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
                display: false
            }
        }
    };

    const labels = chartData.map((item) => item.name);
    const data = {
    labels: labels,
    datasets: [
    {   
        data: chartData.map((item) => item.money * 1000),
        backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)"
        ],
        borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)"
        ],
        borderWidth: 1
    }
    ]
    };
    return (
        <Bar options={options} data={data} />
    )
}
