import React, {useEffect} from 'react';
import { useState } from 'react';
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
import NumberOfMonthsSelector from "./NumberOfMonthsSelector";
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

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
    ticks: {
        precision:0
    },
    scales: {
        y: {
            title: {
                display: true,
                text: ''
            }
        },
        x: {
            title: {
                display: true,
                text: ''
            }
        }
    }
};

const defaultLabels = ['6', '5', '4', '3', '2', '1', '0'];

function parseData(data) {
    const data_list = [];
    for (const key of Object.keys(data))
        data_list.unshift(data[key]);
    return data_list;
}

function handler(months, args) {
    args.apiHandler.getMetricsDataFromDaysAgo(args.metrics_id, months * 30)
        .then((res) => {
            args.setNumberOfMonths(months);
            const parsedData = parseData(res.data);
            const labels = [...Array(parsedData.length).keys()].reverse();
            args.setChartsData({
                labels: labels,
                datasets: [
                    {
                        label: args.title,
                        data: parsedData,
                        borderColor: args.color,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)'
                    },
                ],
            });
        }).catch((err)=>console.log("error!"));
}

export default function LineChartWithMonthSelector(props) {


    const [chartsData, setChartsData] = useState({
        labels: defaultLabels,
        datasets: [
            {
                label: 'LogIns with user and password',
                data: [],
                borderColor: props.color,
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            },
        ],
    });
    const [haveData, setHaveData] = useState(false);
    const [numberOfMonths, setNumberOfMonths] = useState(1);

    useEffect(() => {
        //get transactions
        

        props.apiHandler.getMetricsDataFromDaysAgo(props.metrics_id, numberOfMonths * 30)
            .then((res) => {
                const parsedData = parseData(res.data);
                const labels = [...Array(parsedData.length).keys()].reverse();
                setChartsData({
                    labels: labels,
                    datasets: [
                        {
                            label: props.title,
                            data: parsedData,
                            borderColor: props.color,
                            backgroundColor: 'rgba(255, 99, 132, 0.5)'
                        },
                    ],
                });
                setHaveData(true);
            }).catch((err) => console.log("error!"));
    },[]);

    const handler_args = {
        metrics_id: props.metrics_id,
        apiHandler: props.apiHandler,
        setChartsData: setChartsData,
        setNumberOfMonths: setNumberOfMonths,
        title: props.title,
        color: props.color
    };

    options.scales.y.title.text = (props.yTitle)?props.yTitle:'';
    options.scales.x.title.text = (props.xTitle)?props.xTitle:'';

    if (!haveData)
        return <div>Loading...</div>
    else
        return (
            <Box>
            
                <NumberOfMonthsSelector defaultValue={numberOfMonths} handler={handler} handler_args={handler_args}/>
                <div>
                    <Line width={(props.width) ? props.width : 750} height={(props.height) ? props.height : 200}
                        options={options} data={chartsData} />
                </div>
        </Box>);
}




