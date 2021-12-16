import React from 'react';
import classes from './Chart.module.scss';
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export const options = {
    scales: {
        x: {
            type: 'linear',
        },
        y: {
            type: 'linear'
        }
    }
}

export const datasets = [
    {
        id: 1,
        label: 'temp',
        data: [
            296.63145999593024,
            298.2869302216746,
            299.4010206353587,
            297.3748514861457,
            296.0396415571533,
            294.44753878294586,
            294.4589146588886,
            296.128136702767,
            297.6024562247509,
            296.2966263449363,
            295.4170424567078,
            295.1244367253933
        ],
        borderColor: 'red',
        backgroundColor: 'white',
        borderWidth: 3,
    },
    {
        id: 2,
        label: 'con',
        data: [
            384.3870673463575,
            384.62040380788187,
            385.27437749079155,
            385.55760059949625,
            386.2560488329923,
            387.46387541860554,
            387.9132647222935,
            387.72749488300207,
            387.3164927954491,
            387.1570056276377,
            386.854234269223,
            386.5632334014566
        ],
        borderColor: 'blue',
        backgroundColor: 'white',
        borderWidth: 3,
    },
]

const Chart = () => {
    return (
        <div className={classes.chart_style}>
            <Line
                type='line'
                datasetIdKey='id'
                options={options}
                data={{
                    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
                    datasets: datasets,
                }}
            />
        </div>
    );
};

export default Chart;