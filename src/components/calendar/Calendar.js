import React, { useState } from 'react'
import styled from 'styled-components'

const Calendar = () => {
  const today = new Date()
  const thisYear = today.getFullYear()
  const thisMonth = today.getMonth()

  const [year, setYear] = useState(thisYear)
  const [month, setMonth] = useState(thisMonth + 1)

  const lastDate = new Date(year, month, 0).getDate()
  const dates = []
  for (var i = 0; i < lastDate; i++) {
    dates.push(i + 1)
  }

  const days = [
    { id: 0, day: '일' },
    { id: 1, day: '월' },
    { id: 2, day: '화' },
    { id: 3, day: '수' },
    { id: 4, day: '목' },
    { id: 5, day: '금' },
    { id: 6, day: '토' },
  ]

  // const getLastDate = (year, month) => {
  //   switch (month) {
  //     case 4:
  //     case 6:
  //     case 9:
  //     case 11:
  //       return 30
  //     case 2:
  //       if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) return 29
  //       else return 28
  //     default:
  //       return 31
  //   }
  // }

  return (
    <div>
      <header>
        {year}년 {month + 1}월{' '}
      </header>
      {/* 요일 */}
      <button
        onClick={() => {
          setMonth(month - 1)
        }}
      >
        {' '}
        ◀️{' '}
      </button>
      {days.map((day) => (
        <CalendarHeader>{day.day}</CalendarHeader>
      ))}
      <button
        onClick={() => {
          setMonth(month + 1)
        }}
      >
        {' '}
        ▶️{' '}
      </button>

      {dates.map((a) => {
        return <div>{a}</div>
      })}
    </div>
  )
}

export default Calendar

const CalendarHeader = styled.div`
  display: inline-block;
`
