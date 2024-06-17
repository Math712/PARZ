import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, plugins, Legend, ChartArea, ChartData, LineElement, PointElement, Filler } from "chart.js"
import { useEffect, useRef, useState } from "react"
import { createGradient } from '@utils/chart'
import { ChartsProps } from "@types/Chart"

ChartJS.register(CategoryScale, LinearScale,  PointElement, LineElement, Filler, Tooltip, plugins, Legend)

export const LineCharts = ({data, label, legend, customOption, title}: ChartsProps) => {
	const chartRef = useRef<ChartJS<'line', string[], string>>(null)
	const [chartData, setChartData] = useState<ChartData<'line', string[], string>>({
    labels: label,
    datasets: [{
      data: data,
      fill: 'start',
      label: legend,
      borderColor: '#4338ca',
			backgroundColor: {}
    }]
  })

  const options = {
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: title,
			},
		},
		scales: {
			x: {
				display: false,
			},
		},
		...customOption
	}

	useEffect(() => {
		const chart = chartRef.current
		if (!chart) {
      return;
    }
		const tmpChartData = {
			...chartData,
		}
		tmpChartData.labels = label
		tmpChartData.datasets[0].data = data
		tmpChartData.datasets[0].backgroundColor = createGradient(chart.ctx, chart.chartArea)
		setChartData(tmpChartData)
	}, [data, label])

  return <Line redraw={true} data={chartData} options={options} ref={chartRef} />
}
