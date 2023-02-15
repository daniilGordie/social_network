import React, { useState } from 'react'
import s from './Paginator.module.css'

type PropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  portionSize?: number
}

const Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize)

  let pages: Array<number> = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let portionCount = Math.ceil(pagesCount / portionSize)
  const [portionNumber, setPortionNumber] = useState(1)
  const leftPortionNumber = (portionNumber - 1) * portionSize + 1
  const rightPortionNumber = portionNumber * portionSize

  return (
    <div className={s.paginator}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1)
          }}
        >
          PREV
        </button>
      )}
      {pages
        .filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
        .map((p) => {
          return (
            <span
              key={p}
              className={currentPage === p ? s.selectedPage : ''}
              onClick={() => {
                onPageChanged(p)
              }}
            >
              {p}
            </span>
          )
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1)
          }}
        >
          Next
        </button>
      )}
    </div>
  )
}

export default Paginator
