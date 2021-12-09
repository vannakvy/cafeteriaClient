import React from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { theme } from '../../../static/theme';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OrderDetailCompare({ dataDb1, dataDb2 }) {

    const labels = ['ប្រាក់ទូទាត់រួច', 'ប្រាក់មិនទូទាត់'];

    const data = {
        labels,
        datasets: [
            {
                label: '# of Votes',
                data: [dataDb1, dataDb2],
                backgroundColor: [
                    theme.greenColor,
                    theme.pinkColor,
                ],
                font: {
                    size: 18,
                    family: "khmerOsSiemReap"
                }
            },
        ],
    }

    return (
        <Pie
            options={{
                plugins: {
                    legend: {
                        labels: {
                            // This more specific font property overrides the global property
                            font: {
                                size: 14,
                                family: "khmerOsSiemReap"
                            },
                            position: "bottom"
                        }
                    },
                }
            }}
            data={data}
        />
    )
}
