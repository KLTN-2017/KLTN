import React, { useState, useEffect } from 'react'
import { Modal, Input, AutoComplete } from 'antd'
import Select from 'react-select'
import {
  ActionRoute,
  defaultActionRoute,
} from '../../../api/interface/actionRoute'
import './modalCreate.scss'
import {
  fectListPermission,
  clearAction,
  createRouteAction,
} from '../systemSlice'
import {useDispatch, useSelector} from 'react-redux'
import { RootState } from 'app/rootReducer'
interface Props {
  isShow: boolean
  setShow: (show: boolean) => void
}
const ModalCreate = ({ isShow, setShow }: Props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fectListPermission())
    return () => {
      dispatch(clearAction())
    }
  }, [dispatch])
  const listAction = useSelector((state: RootState) => state.system.listPermission)?.map(name => ({value: name.name, label: name.name}))
  const [routeAction, setRouteAction] = useState<ActionRoute>(
    defaultActionRoute
  )
  const listMethod = [
    { value: 'POST', label: 'POST' },
    { value: 'GET', label: 'GET' },
    { value: 'PUT', label: 'PUT' },
    { value: 'DELETE', label: 'DELETE' },
  ]
  const handleOk = () => {
    dispatch(createRouteAction(routeAction, () => {
      setRouteAction(defaultActionRoute)
      setShow(false)
    }))
  }
  const handleCancel = () => {
    setShow(false)
    setRouteAction(defaultActionRoute)
  }
  return (
    <>
      <Modal
        title="Tạo quyền cho route"
        visible={isShow}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
      >
        Link url:
        <Input
          size="large"
          placeholder="Enter url..."
          value={routeAction.link}
          onChange={(e) =>
            setRouteAction({ ...routeAction, link: e.target.value })
          }
        />
        Method:
        <Select
          placeholder="Method"
          options={listMethod}
          defaultValue={listMethod[0]}
          onChange={(e) =>
            setRouteAction({ ...routeAction, method: e?.value || 'GET' })
          }
        />
        Action:
        <AutoComplete
          style={{ width: 200 }}
          options={listAction}
          placeholder="Select action ..."
          onChange={(e)=> setRouteAction({...routeAction, action: e})}
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Modal>
    </>
  )
}

export default ModalCreate
