import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import confirm from 'react-alert-confirm'
import Ckeditor from '../../../components/Ckeditor'
import './updateOrCreate.scss'
import { fetchTourById, clearTour, updateTour } from '../tourSlice'
import { Dic } from '../../../api/interface/tour'
import { RootState } from 'app/rootReducer'
import { UpdateTourById, createTour } from '../../../api/tourApi/index'
import InfoTour from './updateorcreate/infoTour'
import UploadImg from '../../../components/UploadImg'
import { setloading } from 'app/rootSlice'
interface Props {
  head: string
}

const UpdateTour = ({ head }: Props) => {
  const [reset, setReset] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [file, setFile] = useState<File | null>(null)
  const { tourId } = useParams<{ tourId: string }>()
  const tour = useSelector((state: RootState) => state.tour.tour)

  useEffect(() => {
    if (parseInt(tourId)) {
      dispatch(fetchTourById(parseInt(tourId)))
    }
    return () => {
      dispatch(clearTour())
    }
  }, [dispatch, tourId, reset])
  const confirmSaveTour = (titles: string) => {
    if (tour) {
      confirm({
        title: `Confirm to save tour`,
        content: <p>{titles}</p>,
        okText: 'Submint',
        cancelText: 'Cancel',
        onOk: () => {
          if (tour.id) UpdateTourById(tour.id, tour, (loading) =>
            dispatch(setloading(loading))
          )
          else createTour(tour, (loading) => dispatch(setloading(loading)))

        }
         
      })
   }
  }
  const confirmReset = () => {
    confirm({
      title: `Confirm to save tour`,
      content: <p>'Bạn có chắc muốn hủy các thay đổi'</p>,
      okText: 'Reset',
      cancelText: 'Cancel',
      onOk: () => setReset(!reset),
    })
  }
  return (
    <div className="create-update">
      <h1>{head}</h1>
      <div className="action">
        <button
          onClick={() => confirmSaveTour(`T${tour?.id} - ${tour?.title}`)}
        >
          Submit <i className="far fa-save"></i>
        </button>
        <button onClick={confirmReset}>Reset</button>
      </div>
      <label className="title">
        Tiêu đề:
        <input
          type="text"
          value={tour?.title}
          onChange={(e) => dispatch(updateTour({ title: e.target.value }))}
        />
      </label>

      <div className="info-tour">
        <div className="img">
          Ảnh:
          <UploadImg
            img={tour?.img || ''}
            setImg={(img) => dispatch(updateTour({img: img }))}
            fileRef={file}
            setFile={setFile}
            bucketName="tour"
          />
        </div>
        <InfoTour tourUpCR={tour} updateTour={(data: Dic) => dispatch(updateTour(data))} />
      </div>
      <Ckeditor
        content={tour?.content ? tour.content : ''}
        change={(data: string) => dispatch(updateTour({content: data }))}
      />
    </div>
  )
}

export default UpdateTour
