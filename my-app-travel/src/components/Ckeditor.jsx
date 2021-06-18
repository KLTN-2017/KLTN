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
    // Configure the available styles.
    styles: ['alignLeft', 'alignCenter', 'alignRight'],

    // Configure the available image resize options.
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

    // You need to configure the image toolbar, too, so it shows the new style
    // buttons as well as the resize buttons.
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
  disabled: true,
  isReadOnly: true,
}
const Ckeditor = (props) => {
  return (
    <CKEditor
      editor={Editor}
      config={config}
      data={props.content}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        console.log('Editor is ready to use!', editor)
      }}
      onChange={(event, editor) => {
        const data = editor.getData()
        console.log({ event, editor, data })
      }}
      onBlur={(event, editor) => {
        console.log('Blur.', editor)
      }}
      onFocus={(event, editor) => {
        console.log('Focus.', editor)
      }}
    />
  )
}

export default Ckeditor
