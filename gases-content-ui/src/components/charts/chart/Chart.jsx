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


// export const options = {
//     scales: {
//         x: {
//             type: 'linear',
//         },
//         y: {
//             type: 'linear'
//         }
//     }
// }

// export const datasets = [
//     {
//         id: 1,
//         label: 'temp',
//         data: [
//             296.63145999593024,
//             298.2869302216746,
//             299.4010206353587,
//             297.3748514861457,
//             296.0396415571533,
//             294.44753878294586,
//             294.4589146588886,
//             296.128136702767,
//             297.6024562247509,
//             296.2966263449363,
//             295.4170424567078,
//             295.1244367253933
//         ],
//         borderColor: 'red',
//         backgroundColor: 'white',
//         borderWidth: 3,
//     },
// ]

const Chart = ({options, datasets}) => {
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