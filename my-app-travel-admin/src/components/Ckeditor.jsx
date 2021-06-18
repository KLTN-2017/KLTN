import React from 'react'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react'

const config = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
      'imageInsert',
      'alignment',
      'codeBlock',
      'fontBackgroundColor',
      'fontColor',
      'fontSize',
      'fontFamily',
      'highlight',
    ],
  },
  language: 'en',
  image: {
    styles: ['alignLeft', 'alignCenter', 'alignRight'],
    resizeOptions: [
      {
        name: 'resizeImage:original',
        label: 'Original',
        value: null,
      },
      {
        name: 'resizeImage:50',
        label: '50%',
        value: '50',
      },
      {
        name: 'resizeImage:75',
        label: '75%',
        value: '75',
      },
      {
        name: 'resizeImage:25',
        label: '25%',
        value: '25',
      },
      {
        name: 'resizeImage:15',
        label: '15%',
        value: '15',
      },
    ],
    toolbar: [
      'imageStyle:alignLeft',
      'imageStyle:alignCenter',
      'imageStyle:alignRight',
      '|',
      'resizeImage',
      '|',
      'imageTextAlternative',
    ],
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableCellProperties',
      'tableProperties',
    ],
  },
  licenseKey: '',
  ckfinder: {
    uploadUrl: 'http://localhost:9999/ckeditor-upload-img',
  },
}

const Ckeditor = (props) => {
  return (
    <CKEditor
      editor={Editor}
      config={config}
      data={props.content}
      onReady={(editor) => {
        console.log('Editor is ready to use!', editor)
      }}
      onChange={(event, editor) => {
        const data = editor.getData()
        props.change(data)
      }}
    />
  )
}

export default Ckeditor
