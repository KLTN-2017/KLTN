import React from 'react'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import { Tour } from '../../../../api/interface/tour'
import confirm from 'react-alert-confirm'
import { checkShowAction } from '../../../../utils/checkAction'
interface Props {
  data: Tour[]
  deleteTour: (id: string, title: string) => void
  listChecked: string[]
  setListChecked: (listChecked: string[]) => void
}

const HtmlData = ({ data, deleteTour, listChecked, setListChecked }: Props) => {
  const confirmDelete = (title: string, id: string) => {
    confirm({
      title: `Confirm to delete tour`,
      content: <p>{title}</p>,
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => deleteTour(id, title),
    })
  }
  const html = data.map((tour, index) => (
    <div className="item-tour" key={index}>
      <div className="content">
        <LazyLoad height={300}>
          <img src={tour.img} alt={tour.title} loading="lazy" />
        </LazyLoad>

        <div className="info">
          <p className="title">{tour.title}</p>
          <span>
            <i className="fas fa-map-marker-alt"></i>
            {tour.map_maker}
          </span>
          <span>
            <i className="fas fa-money-bill-wave"></i>
            {parseInt(tour.price).toLocaleString()}
          </span>
          <span>
            <i className="far fa-calendar-check"></i>
            {tour.date_start}
          </span>
          <span>
            <i className="fas fa-bell"></i>
            {tour.note_attack ? tour.note_attack : 'Không.'}
          </span>
        </div>
      </div>
      <div className="action">
        {checkShowAction('updateTour') && (
          <Link to={`/du-lich/update/${tour.id}`}>
            <i className="fas fa-edit"></i>
          </Link>
        )}
        {checkShowAction('deleteTour') && (
          <i
            onClick={() => confirmDelete(tour.title, tour?.id ? tour.id : '')}
            className="fas fa-trash-alt"
          ></i>
        )}
      </div>
    </div>
  ))
  return <>{html}</>
}

export default HtmlData
