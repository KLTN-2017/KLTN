import React from 'react'
import NoContent from './NoContent'
import Ckeditor from '../../../components/Ckeditor'
interface Props {
  img: string
  content: string
}

const Editor = ({ img, content }: Props) => {
  return (
    <div className="editor">
      <img src={img} alt={img} />
      <div className="content-tour">
        {!content && <NoContent />}
        <Ckeditor />
      </div>
    </div>
  )
}

export default Editor
