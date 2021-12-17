import React, { useState } from 'react'
import styled from 'styled-components'

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
  //이전달의 마지막 날짜
  //이번달 1일의 요일
  //이번달 마지막 날짜의 요일
  //[[1,2,3,4,5,6,7],[],[],[],[],[]]

  //일자 컴포넌트 (Box) -> 이중 맵으로 돌려서 출력

  const getMonth = () => {
    const firstDayOfTheMonth = new Date(year, month, 1).getDay()
    console.log(firstDayOfTheMonth)
    let currentMonthCount = 0 - firstDayOfTheMonth
    const daysMatrix = new Array(6).fill([]).map(() => {
      return new Array(7).fill(null).map(() => {
        currentMonthCount++
        return new Date(year, month, currentMonthCount).getDate()
      })
    })
    return daysMatrix
  }
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
    <Entire>
      <header>
        <button
          onClick={() => {
            firstMonth()
          }}
        >
          ◀️
        </button>
        {year}년 {month + 1}월
        <button
          onClick={() => {
            lastMonth()
          }}
        >
          ▶️
        </button>
        <div></div>
      </header>
      <CalendarBody>
        <Day>
          {days.map((day) => (
            <Box>{day.day}</Box>
          ))}
        </Day>
        <div>
          {prevLastDates.map((a) => {
            return (
              <Box>
                <p>{a}</p>
                <div>지난달</div>
              </Box>
            )
          })}
          {dates.map((a) => {
            return (
              <Box>
                <p>{a}</p>
                <div>공백</div>
              </Box>
            )
          })}
          {nextDates.map((a) => {
            return (
              <Box>
                <p>{a}</p>
                <div>다음달</div>
              </Box>
            )
          })}
        </div>
      </CalendarBody>
    </Entire>
  )
}

export default Calendar

const Entire = styled.div`
  display: grid;
  position: relative;
  margin: auto;
  width: 90%;
`

const Day = styled.div`
  background-color: grey;
  padding:10px
  border: 1px solid white;
`

const CalendarBody = styled.div`
  disply: block;
  background-color: grey;
  padding: 5px;
  margin: 1px;
  border: 1px solid white;
`

const Box = styled.div`
  width: 14%;
  height: 20%;
  border: 1px solid white;
  float: left;
`
