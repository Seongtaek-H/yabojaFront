import React, { useEffect, useState } from 'react'

function Calendar() {
  let thisYear = new Date().getFullYear()
  let thisMonth = new Date().getMonth() + 1

  let [year, setYear] = useState(thisYear)
  let [month, setMonth] = useState(thisMonth)
  let [totalDate, setTotalDate] = useState()
  let thisLastDate = new Date(thisYear, month + 1, 0).getDate()
  let thisDates = []
  thisDates = [...Array(thisLastDate + 1).keys].slice(1)
  console.log(thisDates)

  const changeDate = (month) => {
    // 지난달 마지막 날짜, 요일
    let preLastDate = new Date(thisYear, month, 0).getDate()
    let preLastDay = new Date(thisYear, month, 0).getDay()

    // 이번달 마지막 날짜, 요일
    let thisLastDate = new Date(thisYear, month + 1, 0).getDate()
    let thisLastDay = new Date(thisYear, month + 1, 0).getDay()

    let preDates = []
    if (preLastDay !== 6) {
      for (let i = 0; i < preLastDay + 1; i++) {
        preDates.unshift(preLastDay - i)
      }
    }

    let nextDates = []
    for (let i = 0; i < 7 - thisLastDay; i++) {
      if (i === 0) {
        return nextDates
      }
      nextDates.push(i)
    }

    let thisDates = []
    thisDates = [...Array(thisLastDate + 1).keys].slice(1)

    return preDates.concat(thisDates, preDates)
  }
  console.log(changeDate)

  useEffect(() => {
    setTotalDate(changeDate(thisMonth))
  }, [])

  useEffect(() => {
    setTotalDate(changeDate(month))
  }, [month])

  return (
    <div>
      <div className="head">
        <button
          onClick={() => {
            setMonth(thisMonth - 1)
          }}
        >
          ◀
        </button>
        {year}년 {month}월 <button onClick={() => {}}>▶</button>
      </div>
      <div className="body">{totalDate}</div>
    </div>
  )
}

export default Calendar
