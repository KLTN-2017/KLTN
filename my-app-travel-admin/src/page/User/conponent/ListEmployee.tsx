import { RootState } from 'app/rootReducer'
import {
  fectListPageEmployee,
  clearListEmployee,
  changeRoleOfUser,
  deleteEmloyeeOfList,
} from '../userSlice'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import LoadingComponent from '../../../components/loading/Loading'
import PageNation from '../../../components/PageNation/PageNation'
import confirm from 'react-alert-confirm'
import { checkShowAction } from '../../../utils/checkAction'
import ModalCreateEmployee from '../conponent/ModalCreateEmployee'
const ListEmployee = () => {
  const dispatch = useDispatch()
  const [page, setpage] = useState<number>(1)
  const [isShow, setShow]  = useState<boolean>(false)
  const listRole = useSelector(
    (state: RootState) => state.user.listRole
  ).map((role) => ({ value: role.role, label: role.role }))
  const listCustomer = useSelector(
    (state: RootState) => state.user.listEmployee
  )
  useEffect(() => {
    dispatch(fectListPageEmployee(page.toString()))
    return () => {
      dispatch(clearListEmployee())
    }
  }, [dispatch, page])
  const getRoleUser = (role: string): { label: string; value: string } => {
    return (
      listRole.find((roles) => roles.value === role) || { label: '', value: '' }
    )
  }
  const changeRole = (nameRole: string | undefined, id: string) => {
    if (nameRole) dispatch(changeRoleOfUser(nameRole, id))
  }
  const deleteEmployee = (id: string, name: string) => {
    confirm({
      title: `Bạn có chắc muốn xóa Employee`,
      content: <p>{name}</p>,
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => dispatch(deleteEmloyeeOfList(id, name)),
    })
  }
  const htmlData = listCustomer.rows.map((user) => (
    <div className="customer" key={user.id}>
      <span>{user.id}</span>
      <span className="medium">{user.name}</span>
      <span className="big">{user.email}</span>
      <span>
        {user.date_of_birth ? user.date_of_birth.slice(0, 10) : '-'}
      </span>
      <span className="medium">{user.phone ? user.phone : '-'}</span>
      <span className="big">
        {checkShowAction('getAllRole') ? (
          <Select
            placeholder="Chức vụ"
            options={listRole}
            value={getRoleUser(user.role)}
            onChange={(e) => changeRole(e?.value, user.id)}
          />
        ) : (
          user.role
        )}
      </span>
      <span>{user.sex ? 'NAM' : 'NU'}</span>
      {checkShowAction('deleteEmployee') && (
        <span>
          <i
            onClick={() => deleteEmployee(user.id, user.username)}
            className="fas fa-trash-alt"
          ></i>
        </span>
      )}
    </div>
  ))
  return (
    <>
      <h1>DANH SÁCH NHÂN VIÊN</h1>
      {listCustomer.rows.length > 0 ? (
        <>
          <div className="title-customer">
            <span>id</span>
            <span className="medium">Họ và tên</span>
            <span className="big">Địa chỉ email</span>
            <span>Sinh nhật</span>
            <span className="medium">Số ĐT</span>
            <span className="big">Chức vụ</span>
            <span>Giới tính</span>
            {checkShowAction('deleteEmployee') && <span>Xóa</span>}
          </div>
          {htmlData}
          <div className="create-employee">
            <i onClick={()=> setShow(true)} className="fas fa-plus-circle"></i>
            <ModalCreateEmployee isShow={isShow} setShow={setShow} />
          </div>
          <PageNation
            total={listCustomer.count}
            current={page}
            change={setpage}
          />
        </>
      ) : (
        <LoadingComponent title="Loading list Employee" />
      )}
    </>
  )
}
export default ListEmployee
