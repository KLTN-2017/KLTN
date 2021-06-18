import React from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'
import { CountYearMonth } from 'api/interface/order'
import { autoGeneratorColor } from 'utils/randomListCorlor'
interface Props {
  dataYearMonth: CountYearMonth
}
export default function LineChatOrder({dataYearMonth}: Props) {
  const dataLine = {
    labels: moment.monthsShort(),
    datasets: Object.keys(dataYearMonth).map((year) => ({
      label: year.replace(/'/g, ''),
      data: dataYearMonth[year],
      borderColor: autoGeneratorColor(1),
      tension: 0.1,
    }))
  }
  return (
    <>
      <Line data={dataLine} type='line' />
    </>
  )
}
