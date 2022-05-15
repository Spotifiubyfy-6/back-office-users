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

const defaultLabels = ['6', '5', '4', '3', '2', '1', '0'];

function parseData(data) {
    return data;
}

function handler(months, args) {
    console.log(months);
    args.apiHandler.getMetricsDataFromDaysAgo(args.metrics_id, months * 30)
        .then((res) => {
            args.setNumberOfMonths(months);
            const labels = [...Array(res.length).keys()];
            console.log(labels);
            const parsedData = parseData(res);
            args.setChartsData({
                labels: labels,
                datasets: [
                    {
                        label: 'LogIns with user and password',
                        data: parsedData,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)'
                    },
                ],
            });
        }).catch((err)=>console.log("error!"));
}

export default function LineChartWithMonthSelector(props) {
    if (!props.apiHandler)
        console.log("not defined");
    const [chartsData, setChartsData] = useState({
        labels: defaultLabels,
        datasets: [
            {
                label: 'LogIns with user and password',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)'
            },
        ],
    });
    const [haveData, setHaveData] = useState(false);
    const [numberOfMonths, setNumberOfMonths] = useState(1);

    useEffect(() => {
        props.apiHandler.getMetricsDataFromDaysAgo(props.metrics_id, numberOfMonths * 30)
            .then((res) => {
                const labels = [...Array(numberOfMonths * 30).keys()];
                console.log(labels);
                console.log(res);
                const parsedData = parseData(res);
                console.log(parsedData);
                setChartsData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'LogIns with user and password',
                            data: parsedData,
                            borderColor: 'rgb(255, 99, 132)',
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
        setNumberOfMonths: setNumberOfMonths
    };

    if (!haveData)
        return <div>Loading...</div>
    else
        return (<div>
            <NumberOfMonthsSelector defaultValue={numberOfMonths} handler={handler} handler_args={handler_args}/>
            <div>
                <Line width={(props.width) ? props.width : 750} height={(props.height) ? props.height : 200}
                      options={options} data={chartsData} />
            </div>
        </div>);
}