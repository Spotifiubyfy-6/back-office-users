import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import "./style.css"
import NumericTextField from "./NumericTextField";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top'
        },
    },
    scales: {
        y: {
            title: {
                display: true,
                text: 'Quantity of LogIns'
            }
        },
        x: {
            title: {
                display: true,
                text: 'Days ago'
            }
        }
    }
};

const labels = ['6', '5', '4', '3', '2', '1', '0', ];

export const data = {
    labels,
    datasets: [
        {
            label: 'LogIns with user and password',
            data: labels.map(() => Math.floor(Math.random() * 1000)),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
    ],
};

function handler(number) {
    console.log(number);
}

export default function LineChartWithTextField(props) {

    return (<div>
        <NumericTextField defaultValue={7} handler={handler}/>
        <div>
            <Line width={(props.width)?props.width:750} height={(props.height)?props.height:200}
                        options={options} data={data}/>
        </div>
    </div>);
}
