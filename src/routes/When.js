import React, { useState, useEffect, useMemo } from 'react'
import Upcoming from '../components/upcoming'
import { CALENDAR_WEEKS } from '../constants'
import styled from 'styled-components'
import Loading from '../components/loading'

const Container = styled.div`
  display: flex;
  min-width: var(--min-width);
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`
const Main = styled.div`
  width: 80%;
`
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2.5rem;
`
const Arrow = styled.div`
  display: flex;
  border-radius: 5px;
  font-size: 1rem;
`
const StyledBtn = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 2rem;
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
  min-height: 30rem;
  height: 80vh;
  flex-flow: row wrap;
  border-top: 1px solid whitesmoke;
  border-right: 1px solid whitesmoke;
`
const DateDetail = styled.div`
  width: calc(100% / 7);
  padding: 1rem;
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
  opacity: 0.3;
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
        <Loading />
      ) : (
        <Container>
          <Main>
            <Header>
              {year}??? {month + 1}???
              <Arrow>
                <StyledBtn className="go-prev" onClick={() => firstMonth()}>
                  ??????
                </StyledBtn>
                <StyledBtn className="go-today" onClick={() => goToday()}>
                  today
                </StyledBtn>
                <StyledBtn className="go-next" onClick={() => lastMonth()}>
                  ??????
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
