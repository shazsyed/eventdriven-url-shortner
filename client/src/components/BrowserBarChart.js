import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js"
import { Bar } from "react-chartjs-2"

const BarChart = (props) => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Clicks by browser",
      },
    },
    ticks: {
      precision: 0,
    },
    maintainAspectRatio: false,
    hoverBackgroundColor: "#00A3FF",
  }

  let labels = []
  let dataPoints = []

  if (props.browsers) {
    for (const [key, value] of Object.entries(props.browsers)) {
      labels.push(key)
      dataPoints.push(value)
    }
  } else {
    labels = ["Chrome, Opera, Safari"]
    dataPoints = [0, 0, 0]
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Clicks",
        data: dataPoints,
        backgroundColor: "#00a3ff33",
      },
    ],
  }
  return <Bar options={options} data={data} />
}

export default BarChart
