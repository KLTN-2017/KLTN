import React, { useState, useEffect } from 'react'
import Ckeditor from '../../components/Ckeditor'
import Layout from '../../layout/Main'
import { contentIntroduce, updateIntroduce } from '../../api/introduce/index'
import { setTab } from 'app/rootSlice'
import { useDispatch } from 'react-redux'
import { handleError } from '../../utils/handleError'

const Introduce = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setTab(8))
  }, [dispatch])
  useEffect(() => {
    async function getContent() {
      try {
        const data = await contentIntroduce()
        setContent(data)
      } catch (error) {
        handleError(error)
      }
    }
    getContent()
  }, [])
  const [content, setContent] = useState<string>('')
  return (
    <Layout>
      <button onClick={() => updateIntroduce(content)}>Cập nhật</button>
      <br />
      <br />
      <Ckeditor content={content} change={setContent} />
    </Layout>
  )
}

export default Introduce
