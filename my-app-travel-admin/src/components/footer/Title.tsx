import React, { useState } from 'react'
import './title.css'
interface Props {
  title: string
  showIcon: boolean
}
const Title = ({ title, showIcon }: Props) => {
  const [mode, setMode] = useState<string>('fas fa-angle-down')
  const changeMode = () => {
    mode === 'fas fa-angle-up'
      ? setMode('fas fa-angle-down')
      : setMode('fas fa-angle-up')
  }
  return (
    <div onClick={changeMode} className="collap-footer">
      <p>{title}</p>
      {showIcon ? '' : <i className={mode}></i>}
    </div>
  )
}

export default Title
