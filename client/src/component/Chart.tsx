import { Line } from 'react-chartjs-2';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({ width, height, labels, datasets, afterTooltipLabel }) {
  return (
    <Line
      width={width}
      height={height}
      data={{
        labels,
        datasets: datasets.map((dataset) => {
          return {
            label: dataset.label,
            data: dataset.data,
            backgroundColor: dataset.backgroundColor,
            borderColor: dataset.borderColor,
            tension: 0.5,
            borderWidth: 1.5,
            pointRadius: 1.5,
            pointHoverRadius: 3,
            fill: false
          }
        }),
      }}
      options={{
        responsive: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 15,
              textAlign: 'left'
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (tooltip) => {
                return `${tooltip.dataset.label}: ${tooltip.raw} ${afterTooltipLabel[tooltip.dataset.label!.toLowerCase()]}`;
              }
            }
          }
        }
      }}
    ></Line>
  );
}