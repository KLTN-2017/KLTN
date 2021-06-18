import { RootState } from 'app/rootReducer'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import confirm from 'react-alert-confirm'
import ModalUser from './ModalUser'
import ModalPermission from './ModalPermission'
import ModalUserPermission from './ModalUserPermission'
import {
  fectListPermission,
  clearListPermission,
  deletePermissionApi,
  deleteRoleApi,
  fectListPermissionOfRole,
} from '../userSlice'
import { checkShowAction } from '../../../utils/checkAction'
const RolePermission = () => {
  const dispatch = useDispatch()
  const [modalRole, showModalRole] = useState<boolean>(false)
  const [modalPermission, showModalPermission] = useState<boolean>(false)
  const [modalPermissionRole, showModalPermissionRole] = useState<boolean>(
    false
  )
  const listPermission = useSelector(
    (state: RootState) => state.user.listPermission
  )
  const listRole = useSelector((state: RootState) => state.user.listRole)
  useEffect(() => {
    if (checkShowAction('getAllPermission')) {
      dispatch(fectListPermission())
      return () => {
        dispatch(clearListPermission())
      }
    }
  }, [dispatch])

  const confirmDeleteRole = (
    name: string,
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation()
    confirm({
      title: `Bạn có chắc muốn xóa chức vụ`,
      content: <p>{name}</p>,
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => dispatch(deleteRoleApi(name)),
    })
  }
  const confirmDeletePermission = (name: string) => {
    confirm({
      title: `Bạn có chắc muốn xóa quyền`,
      content: <p>{name}</p>,
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => dispatch(deletePermissionApi(name)),
    })
  }
  const getActionOfRole = (role: string) => {
    dispatch(fectListPermissionOfRole(role))
    showModalPermissionRole(true)
  }
  const htmlRole = listRole.map((role) => (
    <h2 key={role.role} onClick={() => getActionOfRole(role.role)}>
      {role.role.toUpperCase()}
      {checkShowAction('deleteRolePermission') && (
        <i
          onClick={(e) => confirmDeleteRole(role.role, e)}
          className="far fa-times-circle"
        ></i>
      )}
    </h2>
  ))
  const htmlPermission = listPermission.map((permission, index) => (
    <span key={index}>
      {permission.name}
      {checkShowAction('deletePermission') && (
        <i
          onClick={() => confirmDeletePermission(permission.name)}
          className="far fa-times-circle"
        ></i>
      )}
    </span>
  ))
  return (
    <>
      <h1>DANH SÁCH CHỨC VỤ - QUYỀN </h1>
      <div className="role-action">
        <div className="title">
          {checkShowAction('getAllRole') && <span>CHỨC VỤ</span>}
          {checkShowAction('getAllPermission') && <span>DANH SÁCH QUYỀN</span>}
        </div>
        <div className="value-role-action">
          {checkShowAction('getAllRole') && (
            <div className="role">
              {htmlRole}
              {checkShowAction('createRolePermission') && (
                <i
                  onClick={() => showModalRole(true)}
                  className="fas fa-plus-circle"
                ></i>
              )}
            </div>
          )}
          {checkShowAction('getAllPermission') && (
            <div className="action">
              {htmlPermission}
              {checkShowAction('createPermission') && (
                <span>
                  <i
                    onClick={() => showModalPermission(true)}
                    className="fas fa-plus-circle"
                  ></i>
                </span>
              )}
            </div>
          )}
        </div>
        <div className="create-role"></div>
      </div>
      <ModalUser
        isShow={modalRole}
        setShow={showModalRole}
        listAction={listPermission}
      />
      <ModalPermission isShow={modalPermission} setShow={showModalPermission} />
      <ModalUserPermission
        isShow={modalPermissionRole}
        setShow={showModalPermissionRole}
        listAction={listPermission}
      />
    </>
  )
}

export default RolePermission
