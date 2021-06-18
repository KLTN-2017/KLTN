import React, { useState } from 'react'
import { Modal, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { RootState } from 'app/rootReducer'
import { addEmloyeeToListDb } from '../userSlice'
import {
  EmployeeCreate,
  defaultValueEmployeeCreate,
} from '../../../api/interface/user'
interface Props {
  isShow: boolean
  setShow: (show: boolean) => void
}

const ModalCreateEmployee = ({ isShow, setShow }: Props) => {
  const dispatch = useDispatch()
  const listRole = useSelector(
    (state: RootState) => state.user.listRole
  ).map((role) => ({ value: role.role, label: role.role }))
  listRole.unshift({ value: '', label: 'Chọn chức vụ' })
  const listSex = [
    { value: true, label: 'NAM' },
    { value: false, label: 'NU' },
  ]
  const [user, setUser] = useState<EmployeeCreate>(defaultValueEmployeeCreate)
  const handleOk = () => {
    dispatch(addEmloyeeToListDb(user, () => setShow(false)))
  }
  const handleCancel = () => {
    setUser(defaultValueEmployeeCreate)
    setShow(false)
  }
  const valueSelect = (): { label: string; value: string } => {
    return (
      listRole.find((roles) => roles.value === user.role) || {
        value: '',
        label: 'Chọn chức vụ',
      }
    )
  }
  const valueSelectSex = (): { label: string; value: boolean } => {
    return (
      listSex.find((sexs) => sexs.value === user.sex) || {
        value: true,
        label: 'NAM',
      }
    )
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
        Tên đăn nhập:
        <Input
          size="large"
          placeholder="Enter username..."
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        Địa chỉ email:
        <Input
          size="large"
          placeholder="Enter email..."
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        Tên nhân viên:
        <Input
          size="large"
          placeholder="Enter name..."
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        Chức vụ:
        <Select
          placeholder="Chức vụ"
          options={listRole}
          value={valueSelect()}
          onChange={(e) => setUser({ ...user, role: e?.value || '' })}
        />
        Giới tính:
        <Select
          placeholder="Chức vụ"
          options={listSex}
          value={valueSelectSex()}
          onChange={(e) => setUser({ ...user, sex: e ? e.value : true })}
        />
        Mật khẩu Random:
        <Input
          size="large"
          placeholder="Random passrwd..."
          value={user.passwd}
          onChange={(e) => setUser({ ...user, passwd: e.target.value })}
          disabled
        />
      </Modal>
    </>
  )
}

export default ModalCreateEmployee
