import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function Analytic( ) {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
                display: false
            },
            title: {
                display: true,
                text: "Thống Kê"
            },
        }
    };


  const BASE_API = 'https://easy-pear-lamb-gown.cyclic.app/api/';
  const db = [
    {
      _id: "6383360913c0ea24c2d5c350",
      name: "An",
      slug: "an",
      money: -233,
      avatar:
        "https://res.cloudinary.com/dyqpu812n/image/upload/v1669532784/an_klm5kf.png",
      bankName: "MB",
      bankNumber: "708788860",
      createdAt: "2022-11-27T10:03:53.556Z",
      updatedAt: "2022-12-03T11:20:46.666Z",
      __v: 0
    },
    {
      _id: "6383363513c0ea24c2d5c353",
      name: "Khang",
      slug: "khang",
      money: -184,
      avatar:
        "https://res.cloudinary.com/dyqpu812n/image/upload/v1669532784/khang_nka0xu.png",
      bankName: "MB",
      bankNumber: "708788860",
      createdAt: "2022-11-27T10:04:37.150Z",
      updatedAt: "2022-12-03T11:23:45.466Z",
      __v: 0
    },
    {
      _id: "6383364713c0ea24c2d5c355",
      name: "Sơn",
      slug: "son",
      money: -684,
      avatar:
        "https://res.cloudinary.com/dyqpu812n/image/upload/v1669532784/son_qlx2iw.jpg",
      bankName: "MB",
      bankNumber: "708788860",
      createdAt: "2022-11-27T10:04:55.944Z",
      updatedAt: "2022-12-03T10:21:58.473Z",
      __v: 0
    },
    {
      _id: "6383365813c0ea24c2d5c357",
      name: "Hải",
      slug: "hai",
      money: 1373,
      avatar:
        "https://res.cloudinary.com/dyqpu812n/image/upload/v1669532783/hai_knmlvp.jpg",
      bankName: "MB",
      bankNumber: "708788860",
      createdAt: "2022-11-27T10:05:12.171Z",
      updatedAt: "2022-12-03T11:23:45.679Z",
      __v: 0
    },
    {
      _id: "6383366313c0ea24c2d5c359",
      name: "Hiển",
      slug: "hien",
      money: 413,
      avatar:
        "https://res.cloudinary.com/dyqpu812n/image/upload/v1669532783/hien_tdttlg.jpg",
      bankName: "MB",
      bankNumber: "708788860",
      createdAt: "2022-11-27T10:05:23.093Z",
      updatedAt: "2022-12-03T03:56:06.590Z",
      __v: 0
    },
    {
      _id: "6383366d13c0ea24c2d5c35b",
      name: "Kiệt",
      slug: "kiet",
      money: -706,
      avatar:
        "https://res.cloudinary.com/dyqpu812n/image/upload/v1669532783/kiet_zki7bf.jpg",
      bankName: "MB",
      bankNumber: "708788860",
      createdAt: "2022-11-27T10:05:33.021Z",
      updatedAt: "2022-12-03T03:56:06.590Z",
      __v: 0
    }
  ];
  
    const labels = db.map((item) => item.name);
    const data = {
    labels: labels,
    datasets: [
    {   
        data: db.map((item) => item.money * 1000),
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
