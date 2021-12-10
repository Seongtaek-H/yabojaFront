import React, { useEffect, useState } from 'react'

function Calendar() {
  let thisYear = new Date().getFullYear()
  let thisMonth = new Date().getMonth() + 1

  let [year, setYear] = useState(thisYear)
  let [month, setMonth] = useState(thisMonth)
  let [totalDate, setTotalDate] = useState()

  let preLastDate = new Date(thisYear, thisMonth, 0).getDate()
  let preLastDay = new Date(thisYear, thisMonth, 0).getDay()

  // 이번달 마지막 날짜, 요일
  let thisLastDate = new Date(thisYear, month + 1, 0).getDate()
  console.log(thisLastDate)
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
      break
    }
    nextDates.push(i)
  }

  let thisDates = []
  for (let i = 0; i < thisLastDate; i++) {
    thisDates.push(i + 1)
  }

  setTotalDate(preDates.concat(thisDates, nextDates))

  return (
    <div>
      <div className="head">
        <button onClick={() => {}}>◀</button>년 월{' '}
        <button onClick={() => {}}>▶</button>
      </div>
      <div className="body"></div>
    </div>
  )
}

export default Calendar
