import styled from 'styled-components'

const Calendar = () => {
  const days = [
    { id: 0, day: '일' },
    { id: 1, day: '월' },
    { id: 2, day: '화' },
    { id: 3, day: '수' },
    { id: 4, day: '목' },
    { id: 5, day: '금' },
    { id: 6, day: '토' },
  ]

  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1
  const currentDate = today.getDate()
  const fistDay = new Date(currentYear, currentMonth - 1, 1).getDay()

  const getLastDay = (year, month) => {
    switch (month) {
      case 4:
      case 6:
      case 9:
      case 11:
        return 30
      case 2:
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) return 29
        else return 28
      default:
        return 31
    }
  }

  console.log(today)
  return (
    <div>
      <header>달력</header>
      {/* 요일 */}
      {days.map((day) => (
        <CalendarHeader>{day.day}</CalendarHeader>
      ))}
      {/* 달력 일자 */}
    </div>
  )
}

export default Calendar

const CalendarHeader = styled.div`
  display: inline-block;
`
