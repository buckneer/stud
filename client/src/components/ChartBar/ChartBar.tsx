import React from 'react'
import { Bar } from "react-chartjs-2";
import {BarElement, CategoryScale, Chart as ChartJS, LinearScale, Title, Tooltip, Legend} from "chart.js";

interface IChartBar {
  labels: string[];
  label?: string;
  data: any[];
  backgroundColor?: string | string[];
  barThickness?: number;
  title?: string;
}


ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const ChartBar = ({ labels, label = '', data , backgroundColor, barThickness = 90, title = '' }: IChartBar) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor,
        barThickness,
      }
    ]
  };
  
  return <Bar options={options} data={chartData} />
}

export default ChartBar