import React, { useState, useEffect, useMemo } from 'react'
import Upcoming from '../components/upcoming'
import { CALENDAR_WEEKS } from '../constants'
import styled from 'styled-components'
import Loading from '../components/loading'

const Container = styled.div`
  padding: 0 80px;
  margin: 20px 0;
  table {
    width: 100%;
    height: 70vh;
    border: 1px solid white;
    table-layout: fixed;
    th,
    td {
      border: 1px solid white;
      padding: 10px;
    }
    td {
      text-align: right;
      max-height: 150px;
    }
  }
`
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2.5rem;
`

const StyledBtn = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  font-size: 2rem;
  &:hover {
    transition: all 0.1s ease-in-out;
    color: orange;
  }
`

const Calendar = () => {
  const API_KEY = process.env.REACT_APP_API_KEY
  const currentYear = useMemo(() => new Date().getFullYear(), [])
  const currentMonth = useMemo(() => new Date().getMonth(), [])

  const [loading, setLoading] = useState(true)
  const [contents, setContents] = useState([])
  const [year, setYear] = useState(currentYear)
  const [month, setMonth] = useState(currentMonth)

  const getContents = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1`
      )
    ).json()
    setContents(json.results)
    setLoading(false)
  }
  useEffect(() => {
    getContents()
    console.log(contents)
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

  let dateArray = []
  // <tr>에 7일의 <td>를 넣기 위한 날짜 저장 변수

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Header>
            {year}년 {month + 1}월
            <div>
              <StyledBtn className="go-prev" onClick={() => firstMonth()}>
                ◀️
              </StyledBtn>
              <StyledBtn className="go-today" onClick={() => goToday()}>
                today
              </StyledBtn>
              <StyledBtn className="go-next" onClick={() => lastMonth()}>
                ▶️
              </StyledBtn>
            </div>
          </Header>
          <table>
            <thead>
              <tr>
                {' '}
                {CALENDAR_WEEKS.map((day) => (
                  <th>{day.day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {totalDates.map((date, idx) => {
                dateArray.push({ date, idx })
                if (dateArray.length % 7 === 0) {
                  const dateArrayTmp = JSON.parse(JSON.stringify(dateArray))
                  dateArray = []
                  return (
                    <tr>
                      {dateArrayTmp.map((dateObj) => {
                        if (
                          firstDateIndex <= dateObj.idx &&
                          dateObj.idx < lastDateIndex
                        ) {
                          if (dateObj.idx % 7 === 6) {
                            return (
                              <td style={{ color: 'blue' }}>
                                {dateObj.date}
                                <Upcoming
                                  date={dateObj.date}
                                  contents={contents}
                                  year={year}
                                  month={month}
                                />
                              </td>
                            )
                          } else if (dateObj.idx % 7 === 0) {
                            return (
                              <td style={{ color: 'red' }}>
                                {dateObj.date}
                                <Upcoming
                                  date={dateObj.date}
                                  contents={contents}
                                  year={year}
                                  month={month}
                                />
                              </td>
                            )
                          } else {
                            return (
                              <td>
                                {dateObj.date}
                                <Upcoming
                                  date={dateObj.date}
                                  contents={contents}
                                  year={year}
                                  month={month}
                                />
                              </td>
                            )
                          }
                        } else {
                          return (
                            <td style={{ opacity: 0.3 }}>{dateObj.date}</td>
                          )
                        }
                      })}
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
        </Container>
      )}
    </>
  )
}

export default Calendar
