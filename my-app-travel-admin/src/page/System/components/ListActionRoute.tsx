import { RootState } from 'app/rootReducer'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchListActionRoute, clearAction } from '../systemSlice'
import ModalCreate from './ModalCreate'
const ActionRoute = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchListActionRoute())
        return () => {
            dispatch(clearAction())
        }
    }, [dispatch])
    const [isShow, setShow] = useState<boolean>(false)
  const listAction = useSelector((state: RootState) => state.system.listActionRoute) || []
    const htmlData = listAction?.map((route, index) => (
      <div className="route-action" key={index}>
        <span className="small">{index + 1}</span>
        <span className="big">{route.link}</span>
        <span className="small">{route.method}</span>
        <span className="big">{route.action}</span>
        <span className="big">
          <i className="fas fa-edit"></i>
          <i className="fas fa-trash-alt"></i>
          {route.status === 'on' ? <i className="fas fa-toggle-on"></i> :
          <i className="fas fa-toggle-off"></i>}
        </span>
      </div>
    )) 
    htmlData.unshift(
      <div className="route-action">
        <span className="small">ID</span>
        <span className="big">LINK</span>
        <span className="small">METHOD</span>
        <span className="big">TÊN QUYỀN</span>
        <span className="big">HÀNH ĐỘNG</span>
      </div>
    )

    return (
      <div className="action-route">
        <h1>System Admin</h1>

        <div className="list-action-route">{htmlData}</div>
        <div className="create-i">
          <i onClick={() => setShow(true)} className="fas fa-plus-circle"></i>
        </div>

        <ModalCreate isShow={isShow} setShow={setShow} />
      </div>
    )
}

export default ActionRoute