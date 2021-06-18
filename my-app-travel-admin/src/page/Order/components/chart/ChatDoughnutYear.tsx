import { CountYear } from 'api/interface/order'
import React from 'react'
import { Pie } from 'react-chartjs-2'
import { autoGeneratorColor } from 'utils/randomListCorlor'

interface Props {
  dataYear: CountYear[]
}
export default function ChatDoughnutYear({dataYear}: Props) {
    const data = {
      labels: dataYear.map((year) => year.year),
      datasets: [
        {
          label: 'Doanh số bán hàng qua các năm',
          data: dataYear.map((year) => year.count_year),
          backgroundColor: autoGeneratorColor(dataYear.length),
        },
      ],
      // hoverOffset: 4,
    }
  return (
    <>
      <Pie data={data} type="doughnut" />
    </>
  )
}
