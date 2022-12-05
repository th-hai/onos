import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getMonthlyTransactions } from "./api/user";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
);

export default function MonthlyAnalytic() {

    // get start date and end date of this month
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);

    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(start),
        endDate: new Date(end),
        key: 'selection',
    }) as any;

    const handleSelect = (ranges: any) => {
        console.log(ranges);
        setSelectionRange(ranges.selection);
    }

    // Create a hook to update the chart
    const [chartData, setChartData] = useState([]) as any;

    const getLastestData = async () => {
        const data = await getMonthlyTransactions();
        setChartData(data);
    }

    // Create a hook to update the chart
    useEffect(() => {
        getLastestData();
    }, []);

    const options = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'rgb(255, 99, 132)'
                }
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart',
            },
        },
    }

    const labels = chartData && chartData?.map((user: any) => user.name);
    
    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Tiền Đã Dùng',
            data: chartData && chartData?.map((item: any) => item.totalMoneyUsage),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
          {
            label: 'Tiền Đã Trả',
            data: chartData && chartData?.map((item: any) => item.totalMoneyPaid),
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          }
        ]
    };

    return (
        <Bar options={options} data={data} />
    )
}
