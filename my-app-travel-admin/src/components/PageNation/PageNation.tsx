import Pagination from 'rc-pagination'
import React from 'react'
import './style.scss'
interface PropsPageNation {
  total: number
  change: (page: number) => void
  current: number
  pagSize?: number
}
const PageNation = ({ total, change, current, pagSize }: PropsPageNation) => {
  return (
    <div className="pagination">
      <Pagination
        defaultPageSize={pagSize ? pagSize : 16}
        total={total}
        current={current}
        onChange={change}
      />
    </div>
  )
}

export default PageNation
