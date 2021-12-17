import React, { useState } from 'react'
import '../css/calendar.css'

const Calendar = () => {
  const today = new Date()
  const thisYear = today.getFullYear()
  const thisMonth = today.getMonth()

  const [year, setYear] = useState(thisYear)
  const [month, setMonth] = useState(thisMonth)

  const lastDate = new Date(year, month + 1, 0).getDate()
  const dates = []
  for (let i = 0; i < lastDate; i++) {
    dates.push(i + 1)
  }

  const prevLastDate = new Date(year, month, 0).getDate()
  const prevLastDay = new Date(year, month, 0).getDay()
  const prevLastDates = []
  for (let i = 0; i < prevLastDay + 1; i++) {
    prevLastDates.push(prevLastDate - prevLastDay + i)
  }

  const LastDay = new Date(year, month + 1, 0).getDay()
  const nextDates = []
  for (let i = 0; i < 6 - LastDay; i++) {
    nextDates.push(i + 1)
  }
  const totalDates = prevLastDates.concat(dates, nextDates)

  const firstDateIndex = totalDates.indexOf(1)
  const lastDateIndex = totalDates.lastIndexOf(lastDate) + 1

  console.log(dates)

  const days = [
    { id: 0, day: '일' },
    { id: 1, day: '월' },
    { id: 2, day: '화' },
    { id: 3, day: '수' },
    { id: 4, day: '목' },
    { id: 5, day: '금' },
    { id: 6, day: '토' },
  ]
  function goToday() {
    setYear(thisYear)
    setMonth(thisMonth)
  }
  function firstMonth() {
    if (month === 0) {
      setYear(year - 1)
      setMonth(11)
    } else {
      setMonth(month - 1)
    }
  }

  function lastMonth() {
    if (month === 11) {
      setYear(year + 1)
      setMonth(0)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <html>
      <head>
        <title> calendar </title>
      </head>
      <div className="body">
        <div className="calendar">
          <div className="header">
            <div className="year-month">
              {year}년 {month + 1}월
            </div>
            <div className="nav">
              <button className="go-prev" onClick={() => firstMonth()}>
                ◀️
              </button>
              <button className="go-today" onClick={() => goToday()}>
                today
              </button>
              <button className="go-next" onClick={() => lastMonth()}>
                ▶️
              </button>
            </div>
          </div>
          <div className="main">
            <div className="days">
              {days.map((day) => (
                <div className="day">{day.day}</div>
              ))}
            </div>
            <div className="dates">
              {totalDates.map((date, i) => (
                <div className="date">
                  {i >= firstDateIndex && i < lastDateIndex ? (
                    <span class="this">{date}</span>
                  ) : (
                    <span className="others">{date}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </html>
  )
}

export default Calendar
