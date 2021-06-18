import React from 'react'

import './nodata.scss'
interface Props {
    alert: string
}
const Nodata = ({alert}: Props) => {
    return (
      <div className="nodata">
            <i className="far fa-folder-open"></i>
            <p>{alert}</p>
      </div>
    )
}


export default Nodata