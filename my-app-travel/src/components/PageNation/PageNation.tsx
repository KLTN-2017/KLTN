import Pagination from 'rc-pagination'
import React from 'react'
import './style.scss'
interface PropsPageNation {
  total: number
  change: (page: number) => void
  current: number
  size?: number
}
const PageNation = ({ total, change, current, size }: PropsPageNation) => {
  return (
    <div className="pagination">
      <Pagination
        defaultPageSize={size ? size : 16}
        total={total}
        current={current}
        onChange={(page) => {
          window.scrollTo(0,0)
          change(page)
        }}
      />
    </div>
  )
}

export default PageNation
