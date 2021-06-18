import React, { useState } from 'react';
import { Modal} from 'antd';
import UploadImg from '../UploadImg'
import { createImgToBanner } from './slideSlice'
import { useDispatch } from 'react-redux'
interface Props {
  isShow: boolean
  setShow: (show: boolean) => void
  upload: (src: string) => void
}
const UploadModal = ({ isShow, setShow, upload }: Props) => {
  const dispatch = useDispatch()
  const [img, setImg] = useState<string>('')
  const [fileRef, setFile] = useState<File | null>(null)

  const handleOk = () => {
    dispatch(createImgToBanner(img, () => {
      setShow(false)
      setImg('')
      setFile(null)
    }))
  };

  const handleCancel = () => {
    setImg('')
    setFile(null)
    setShow(false)
  };

  return <Modal title="Thêm vào slide show" visible={isShow} onOk={handleOk} onCancel={handleCancel}>
        <UploadImg img={img} setImg={setImg} fileRef={fileRef} setFile={setFile} bucketName='banner' />
        </Modal>
   
}
  export default UploadModal