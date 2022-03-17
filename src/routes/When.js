import React, { useState, useEffect, useMemo } from 'react'
import Upcoming from '../components/upcoming'
import { CALENDAR_WEEKS } from '../constants'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'NotoSansKr-Thin';
`

const Main = styled.div`
  width: 80vw;
  margin: 50px;
  justify-content: center;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 40px;
`
const Arrow = styled.div`
  display: flex;
  border-radius: 5px;
  font-size: 20px;
`

const StyledBtn = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    transition: all 0.1s ease-in-out;
    color: orange;
  }
`

const Days = styled.div`
  display: flex;
`
const Day = styled.div`
  width: calc(100% / 7);
  text-align: center;
  border: 1px solid whitesmoke;
  &:nth-child(7n + 1) {
    color: #d13e3e;
  }
  &:nth-child(7n) {
    color: #396ee2;
  }
`
const Dates = styled.div`
  display: flex;
  flex-flow: row wrap;
  height: 80vh;
  border-top: 1px solid whitesmoke;
  border-right: 1px solid whitesmoke;
`

const DateDetail = styled.div`
  width: calc(100% / 7);
  padding: 15px;
  text-align: right;
  border-bottom: 1px solid whitesmoke;
  border-left: 1px solid whitesmoke;
  &:nth-child(7n + 1) {
    color: #d13e3e;
  }
  &:nth-child(7n) {
    color: #396ee2;
  }
`
const Others = styled.span`
  opacity: 0.33;
`
const Loading = styled.div`
  font-size: 150px;
  font-weight: 700;
  text-align: center;
  padding: 100px;
`

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
        <Loading>Loading</Loading>
      ) : (
        <Container>
          <Main>
            <Header>
              {year}년 {month + 1}월
              <Arrow>
                <StyledBtn className="go-prev" onClick={() => firstMonth()}>
                  ◀️
                </StyledBtn>
                <StyledBtn className="go-today" onClick={() => goToday()}>
                  today
                </StyledBtn>
                <StyledBtn className="go-next" onClick={() => lastMonth()}>
                  ▶️
                </StyledBtn>
              </Arrow>
            </Header>
            <Days>
              {CALENDAR_WEEKS.map((day) => (
                <Day>{day.day}</Day>
              ))}
            </Days>
            <Dates>
              {totalDates.map((date, i) => (
                <React.Fragment key={i}>
                  <DateDetail>
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
                      <Others>{date}</Others>
                    )}
                  </DateDetail>
                </React.Fragment>
              ))}
            </Dates>
          </Main>
        </Container>
      )}
    </>
  )
}

export default Calendar
