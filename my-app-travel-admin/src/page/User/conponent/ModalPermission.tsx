import React, { useState } from 'react'
import { Modal, Input, notification } from 'antd'
import { useDispatch } from 'react-redux'
import { createNewPermission } from '../userSlice'
import './modalPermisson.scss'
interface Props {
  isShow: boolean
  setShow: (show: boolean) => void
}
const ModalPermission = ({ isShow, setShow }: Props) => {
  const [inputList, setInputList] = useState<{ name: string }[]>([{ name: '' }])

  const dispatch = useDispatch()
  const handleOk = () => {
    if (!inputList.every((per) => per.name === ''))
      dispatch(
        createNewPermission(inputList, () => {
          setShow(false)
          setInputList([{ name: '' }])
        })
      )
    else
      notification.warn({
        message: 'Bạn chưa tạo một quyền nào',
      })
  }
  const handleCancel = () => {
    setShow(false)
    setInputList([{ name: '' }])
  }
  const addInputPer = () => {
    setInputList([...inputList, { name: '' }])
  }
  const changeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const list = [...inputList]
    list[index].name = e.target.value.trim()
    setInputList(list)
  }
  const removeInput = (index: number) => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list)
  }

  return (
    <>
      <Modal
        title="Tạo mới chức vụ"
        visible={isShow}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
      >
        {inputList.map((input, index) => (
          <>
            Tên quyền:
            <div className="input-permission">
              <Input
                size="large"
                placeholder="Enter new role..."
                value={input.name}
                onChange={(e) => changeInput(e, index)}
              />
              <i
                onClick={() => removeInput(index)}
                className="far fa-times-circle"
              ></i>
            </div>
          </>
        ))}
        <i onClick={addInputPer} className="fas fa-plus-circle"></i>
      </Modal>
    </>
  )
}

export default ModalPermission
