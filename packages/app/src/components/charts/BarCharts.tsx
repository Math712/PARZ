import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip, plugins, Legend, ChartArea, ChartData, BarElement } from "chart.js"
import { useEffect, useRef, useState } from "react"
import { createGradient } from '@utils/chart'
import { ChartsProps } from "@types/Chart"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, plugins, Legend)

export const BarCharts = ({data, label, legend, customOption, title}: ChartsProps) => {
	const chartRef = useRef<ChartJS<'bar', string[], string>>(null)
	const [chartData, setChartData] = useState<ChartData<'bar', string[], string>>({
    labels: label,
    datasets: [{
      data: data,
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
		tmpChartData.datasets[0].backgroundColor = createGradient(chart.ctx, chart.chartArea)
		setChartData(tmpChartData)
		chart.render()
	}, [data, label])

  return <Bar data={chartData} options={options} ref={chartRef} />
}
