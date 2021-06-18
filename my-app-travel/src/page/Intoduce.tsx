import React, { useEffect, useState } from 'react'
import Layout from '../layout/Main'
import { contentIntroduce } from '../api/introduce'
import parse from 'html-react-parser'
const Introduce = () => {
  const [content, setContent] = useState<string>('')
  useEffect(() => {
    async function getContent() {
      const data = await contentIntroduce()
      setContent(data)
    }
    getContent()
  }, [])
  return (
    <Layout>
      <div className="ck-content">{parse(content)}</div>
    </Layout>
  )
}

export default Introduce
