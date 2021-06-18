import React, { useState } from 'react'
import { Modal, Input } from 'antd'
import { notification } from 'antd'
import { useDispatch } from 'react-redux'
import { createNewRole } from '../userSlice'
import './modalUser.scss'
interface Props {
  isShow: boolean
  setShow: (show: boolean) => void
  listAction: { name: string }[]
}
const ModalUser = ({ isShow, setShow, listAction }: Props) => {
  const [perSelect, setPerSelect] = useState<string[]>([])
  const [role, setRole] = useState<string>('')
  const dispatch = useDispatch()
  const handleOk = () => {
    if (role && perSelect.length > 0) {
      const listData = perSelect.map((permission) => ({ role, permission }))
      dispatch(
        createNewRole(listData, () => {
          setShow(false)
          setPerSelect([])
          setRole('')
        })
      )
    } else
      notification.warn({
        message: 'Bạn cần nhập đủ dữ liệu',
        description: 'Tên chức vụ và quyền không được để trống',
      })
  }
  const handleCancel = () => {
    setShow(false)
    setPerSelect([])
    setRole('')
  }
  const addPermission = (permission: string) => {
    if (perSelect.includes(permission))
      setPerSelect(perSelect.filter((per) => per !== permission))
    else setPerSelect([...perSelect, permission])
  }
  const listPermission = listAction.map((action, index) => (
    <span
      className={perSelect.includes(action.name) ? 'active' : ''}
      onClick={() => addPermission(action.name)}
      key={index}
    >
      {action.name}
      {perSelect.includes(action.name) && <i className="fas fa-check"></i>}
    </span>
  ))
  return (
    <>
      <Modal
        title="Tạo mới chức vụ"
        visible={isShow}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
      >
        Tên chức vụ:
        <Input
          size="large"
          placeholder="Enter new role..."
          value={role}
          onChange={(e) => setRole(e.target.value.toUpperCase())}
        />
        <h2>Thêm quyền cho nó:</h2>
        <div className="list-action">{listPermission}</div>
      </Modal>
    </>
  )
}

export default ModalUser
