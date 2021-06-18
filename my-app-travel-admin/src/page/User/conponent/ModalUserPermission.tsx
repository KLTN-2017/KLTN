import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import { notification } from 'antd'
import { useDispatch } from 'react-redux'
import { updateRole } from '../userSlice'
import { useSelector } from 'react-redux'
import './modalUser.scss'
import { RootState } from 'app/rootReducer'
interface Props {
  isShow: boolean
  setShow: (show: boolean) => void
  listAction: { name: string }[]
}
const ModalUserPermission = ({ isShow, setShow, listAction }: Props) => {
  const [perSelect, setPerSelect] = useState<string[]>([])
  const dispatch = useDispatch()
  const listActionOfRole = useSelector(
    (state: RootState) => state.user.listActionOfRole
  )
  const currentRole = useSelector((state: RootState) => state.user.role)

  useEffect(() => {
    setPerSelect(listActionOfRole.map((per) => per.permission))
  }, [listActionOfRole])

  const handleOk = () => {
    if (perSelect.length > 0) {
      const listData = perSelect.map((permission) => ({
        role: currentRole,
        permission,
      }))
      dispatch(
        updateRole(listData, () => {
          setShow(false)
          setPerSelect([])
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
        title={`Thông tin về ${currentRole}`}
        visible={isShow}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
      >
        <h2>Quyền của {currentRole} :</h2>
        <div className="list-action">{listPermission}</div>
      </Modal>
    </>
  )
}

export default ModalUserPermission
