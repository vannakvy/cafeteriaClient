import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { theme } from '../../../static/theme';
import { addMonthForBarChart } from '../../../functions/fn';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function ExpIncValue({ dataDb }) {

    const labels = ['មករា', 'កុម្ភះ', 'មិនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្តដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];

    const data = {
        labels,
        datasets: [
            {
                label: 'ចំណូល',
                data: addMonthForBarChart(dataDb)?.income,
                backgroundColor: theme.greenColor,
                barThickness: 25,
            },
            {
                label: 'ចំណាយ',
                data: addMonthForBarChart(dataDb)?.expense,
                backgroundColor: theme.pinkColor,
                barThickness: 25,
            },
        ],
    };

    return (
        <div
        >
            <Bar
                height={90}
                options={{
                    plugins: {
                        legend: {
                            labels: {
                                // This more specific font property overrides the global property
                                font: {
                                    size: 18,
                                    family: "khmerOsSiemReap"
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                font: {
                                    size: 18,
                                    family: "Khmer OS Siemreap"
                                },
                                //   color:'#e6fffb',
                                // mirror:true,
                                // autoSkip: false,
                                // maxRotation: 90,
                                // minRotation: 90,

                            },
                            // gridLines: {
                            //   color: "#FFFFFF",
                            // }
                        },
                        y: {
                            ticks: {
                                font: {
                                    size: 15,
                                    family: "Khmer OS Siemreap",

                                },
                                // color:'#b5f5ec',
                                // mirror:true,
                                // maxTicksLimit: 10

                            },
                            // gridLines: {
                            //   color: "rgba(0, 0, 0, .125)",
                            // }
                        }
                    },
                }}
                data={data}
            />
        </div>
    )
}
