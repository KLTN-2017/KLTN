import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import './slide.scss'
import { 
  fecthListImgOfBanner, 
  deleteImgOfBanner, 
} from './slideSlice'
import confirm from 'react-alert-confirm'
import { useSelector, useDispatch } from 'react-redux'
import UploadModal from './UploadImg'
const Slide = () => {
  const [isShow, setShow] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fecthListImgOfBanner())
  }, [dispatch])
  const listImgBanner = useSelector(
    (state) => state.banner.listSrc
  )
  const confirmDeleteImgBanner = (id) => {
    confirm({
      title: `Bạn có chắc muốn xóa`,
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => dispatch(deleteImgOfBanner(id)),
    })
  }
  const htmlData = listImgBanner.map((src, index) => (
    <div key={index}>
      <h3>
        <img src={src.src} alt={src.src} />
        <div className="action">
          <button>Edit</button>
          <button onClick={() => confirmDeleteImgBanner(src.id)}>Delete - { src.id}</button>
          <button onClick={()=> setShow(true)} >Add</button>
        </div>
      </h3>
    </div>
  ))
  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    autoplay: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  }
  return (
    <>
      <Slider {...settings}>{listImgBanner.length > 0 && htmlData}</Slider>
      <UploadModal isShow={isShow} setShow={setShow} />
    </>
  )
}
export default Slide
