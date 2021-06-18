import { Modal } from 'antd'
import { RootState } from 'app/rootReducer'
import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { clearDataChart, getDataChartForYou } from '../orderSlice'
import ChatDoughnutYear from './chart/ChatDoughnutYear'
import LineChatOrder from './chart/ChatLineOrder'
interface Props {
  isShow: boolean
   setShowChart: (show: boolean) => void
}
const ChartOrder = ({isShow, setShowChart}: Props) => {
    const dispatch = useDispatch()
    const dataChart = useSelector((state: RootState) => state.order.dataChart)
    
    useEffect(() => {
        dispatch(getDataChartForYou())
        return () => {
            clearDataChart()
        }
    }, [dispatch])
    return (
      <Modal
        title="Thống kê doanh thu qua các năm"
        centered
        visible={isShow}
        onOk={() => setShowChart(false)}
        onCancel={() => setShowChart(false)}
        width={1500}
      >
        <h1>Tổng doanh số bán hàng qua các năm</h1>
        <ChatDoughnutYear dataYear={dataChart.chartYear} />
        <h1>Tổng doanh số bán hàng qua các tháng trong năm</h1>
        <LineChatOrder dataYearMonth={dataChart.mountByYearMonth} />
      </Modal>
    )
}

export default ChartOrder