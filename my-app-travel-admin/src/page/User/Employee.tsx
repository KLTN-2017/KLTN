import { fectListRole, clearListRole } from './userSlice'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import RolePermission from './conponent/RolePermission'
import ListEmployee from './conponent/ListEmployee'
import { checkShowAction } from '../../utils/checkAction'
import {} from '../../utils/checkAction'
const Customer = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (checkShowAction('getAllRole')) {
      dispatch(fectListRole())
      return () => {
        dispatch(clearListRole())
      }
    }
  }, [dispatch])

  return (
    <div className="list-customer">
      {checkShowAction('getPageEmployee') && <ListEmployee />}
      {(checkShowAction('getAllRole') ||
        checkShowAction('getAllPermission')) && <RolePermission />}
    </div>
  )
}

export default Customer
