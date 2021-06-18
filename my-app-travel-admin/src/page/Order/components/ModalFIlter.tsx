import React, { useState, useEffect } from 'react'
import { Modal, AutoComplete, DatePicker, Button } from 'antd'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { setFilter } from '../orderSlice'
import { getAllIdEmailCustomer } from '../../../api/user/index'
import { handleError } from 'utils/handleError'
import { FilterOrder, DefaultFilterOrder } from 'api/interface/order'
interface Props {
  isShow: boolean
  setShow: (show: boolean) => void
  setFilterMain: (filterOrder: FilterOrder) => void
}
const ModalCreate = ({ isShow, setShow, setFilterMain }: Props) => {
  const dispatch = useDispatch()
  const [type, setType] = useState<string>('')
  const filter = useSelector((state: RootState) => state.order.filter)
  const [filterCurrent, setCurrentFilter] = useState<FilterOrder>(
    DefaultFilterOrder
  )
  const [filterCurrentName, setCurrentFilterName] = useState<FilterOrder>(
    DefaultFilterOrder
  )
  const [listEmailId, setListEmailId] = useState<
    { value: string; label: string }[]
  >([])
  useEffect(() => {
    async function getData() {
      try {
        const listData = await getAllIdEmailCustomer()
        const listOption = listData.map((data) => ({
          value: data.id + '-' + data.email,
          label: data.id + '-' + data.email,
        }))
        setListEmailId([{value: '', label: 'Tất cả'}, ...listOption])
      } catch (error) {
        handleError(error)
      }
    }
    getData()
  }, [])
  useEffect(() => {
    if (filter) setCurrentFilter(filter)
  }, [filter])
  const handleOk = () => {
    dispatch(setFilter(filterCurrent))
    setFilterMain(filterCurrentName)
    setShow(false)
  }
  const handleCancel = () => {
    setShow(false)
  }
  const optionTime = [
    { value: '', label: 'Tất cả' },
    { value: 'date', label: 'DATE' },
    { value: 'month', label: 'MONTH' },
    { value: 'year', label: 'YEAR' },
  ]
  const optionType = [
    { value: '', label: 'Tất cả' },
    { value: 'T', label: 'Tour du lịch' },
    { value: 'C', label: 'Thêu xe' },
    { value: 'H', label: 'Khách sạn' },
  ]
  const optionPay = [
    { value: '', label: 'Tất cả' },
    { value: 'momo', label: 'MOMO' },
    { value: 'vnpay', label: 'VNPAY' },
    { value: 'zalopay', label: 'ZALOPAY' },
    { value: 'cash', label: 'Tiền mặt' },
  ]
  const onChangeDate = (date: any, dateString: string) => {
    const [year, month, day] = dateString.split('-')
      setCurrentFilter({
        ...filter,
        year: year || '',
        month: month || '',
        day: day || '',
      })
    setCurrentFilterName({
      ...filter,
      year: year || '',
      month: month || '',
      day: day || '',
    })
    
  }
  const valueType = optionTime.find(time => time.value === type)
  const valueTypeOrder = optionType.find(type => type.value === filter.type)
    const valueTypePay = optionType.find((type) => type.value === filter.isPay)

  return (
    <>
      <Modal
        title="Lọc hóa đơn"
        visible={isShow}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
      >
        <Button
          type="primary"
          onClick={() => {
            setCurrentFilter(DefaultFilterOrder)
            setCurrentFilterName(DefaultFilterOrder)
          }}
        >Clear</Button>
        <br />
        Thời gian:
        <Select
          placeholder="Time"
          options={optionTime}
          defaultValue={optionTime[0]}
          value={valueType}
          onChange={(e) => {
            if (e?.value === '') {
              setCurrentFilter({ ...filter, year: '', month: '', day: '' })
              setCurrentFilterName({ ...filter, year: '', month: '', day: '' })
            }
            setType(e?.value || '')
          }}
        />
        {type === 'date' && <DatePicker onChange={onChangeDate} />}
        {type === 'month' && (
          <DatePicker onChange={onChangeDate} picker="month" />
        )}
        {type === 'year' && (
          <DatePicker onChange={onChangeDate} picker="year" />
        )}
        Email khách hàng:
        <AutoComplete
          style={{ width: 200 }}
          options={listEmailId}
          placeholder="Select email customer ..."
          onChange={(e) =>
          {
            setCurrentFilterName({ ...filter, user_id: e })
            setCurrentFilter({ ...filter, user_id: e.split('-')[0] })
          }
          }
          filterOption={(inputValue, option) =>
            option?.label
              ?.toString()
              .toUpperCase()
              .includes(inputValue.toUpperCase()) === true
          }
        />
        Loại hóa đơn:
        <Select
          placeholder="Type"
          options={optionType}
          defaultValue={optionType[0]}
          value={valueTypeOrder}
          onChange={(e) =>
          {
            setCurrentFilter({ ...filter, type: e?.value || '' })
            setCurrentFilterName({ ...filter, type: e?.label || '' })
          }
          }
        />
        Hình thức thanh toán:
        <Select
          placeholder="Type"
          options={optionPay}
          defaultValue={optionPay[0]}
          value={valueTypePay}
          onChange={(e) =>
          {
            setCurrentFilter({ ...filter, isPay: e?.value || '' })
            setCurrentFilterName({ ...filter, isPay: e?.label || ''})
          }
          }
        />
      </Modal>
    </>
  )
}

export default ModalCreate
