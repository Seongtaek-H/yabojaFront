import React, { useState, useEffect, useMemo } from 'react'
import Upcoming from './upcoming'
import '../css/calendar.css'
import { CALENDAR_WEEKS } from '../constants'

const Calendar = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), [])
  const currentMonth = useMemo(() => new Date().getMonth(), [])

  const [loading, setLoading] = useState(true)
  const [contents, setContents] = useState([])
  const [year, setYear] = useState(currentYear)
  const [month, setMonth] = useState(currentMonth)

  const getContents = async () => {
    const json = await (
      await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=6df683327f9037c362fcff75540a2656&language=ko-KR&page=1'
      )
    ).json()
    setContents(json.results)
    setLoading(false)
  }
  useEffect(() => {
    getContents()
  }, [])

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

  function goToday() {
    setYear(currentYear)
    setMonth(currentMonth)
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
    <>
      {loading ? (
        'loading'
      ) : (
        <div className="body">
          <div className="calendar">
            <header className="header">
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
            </header>
            <div className="main">
              <div className="days">
                {CALENDAR_WEEKS.map((day) => (
                  <div className="day">{day.day}</div>
                ))}
              </div>
              <div className="dates">
                {totalDates.map((date, i) => (
                  <React.Fragment key={i}>
                    <div className="date">
                      {i >= firstDateIndex && i < lastDateIndex ? (
                        <span className="this">
                          {date}
                          {contents ? (
                            <Upcoming
                              date={date}
                              contents={contents}
                              year={year}
                              month={month}
                            />
                          ) : (
                            ''
                          )}
                        </span>
                      ) : (
                        <span className="others">{date}</span>
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Calendar
