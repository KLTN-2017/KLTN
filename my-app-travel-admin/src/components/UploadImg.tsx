import React, { useState, useEffect } from 'react'
import { Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import { upload } from '../api/uploadImg'
interface Props {
  img: string
  setImg: (url: string) => void
  fileRef: File | null
  setFile: (file: File | null) => void
  bucketName?: string
}
const UploadImg = ({ img, setImg, fileRef, setFile, bucketName }: Props) => {
  const [imgPreview, setPreview] = useState<string>('')
  const changeImg = (file: File | null) => {
    setFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    if (file) reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (!fileRef) setPreview('')
  }, [fileRef])

  const upLoadToFirebase = async () => {
    if (!fileRef)
      notification.warn({
        message: 'Bạn chưa chọn ảnh',
        description: 'Ảnh của bạn chưa được tải lên',
      })
    else {
      try {
        let formData = new FormData()
        formData.append('image', fileRef)
        const result = await upload(bucketName || 'orther', formData)
        setImg(result.url)
        notification.success({
          message: 'Upload ảnh thành công',
        })
      } catch (error) {
        notification.error({
          message: 'Upload ảnh thất bại',
        })
      }
    }
  }
  return (
    <>
      <Upload
        multiple={false}
        accept="image/*"
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onChange={(e) => {
          changeImg(e.fileList[e.fileList.length - 1].originFileObj)
        }}
        beforeUpload={() => false}
      >
        {imgPreview ? (
          <img src={imgPreview} alt={imgPreview} />
        ) : img ? (
          <img src={img} alt={img} />
        ) : (
          <PlusOutlined style={{ fontSize: '40px', color: '#08c' }} />
        )}
      </Upload>
      <button onClick={upLoadToFirebase}>Upload to server</button>
    </>
  )
}

export default UploadImg
