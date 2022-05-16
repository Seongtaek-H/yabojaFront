export function formatDate(value) {
  const date = new Date(value)
  const year = date.getFullYear()
  let month = date.getMonth()
  month = month > 9 ? month : `0${month}`
  const day = date.getDay()
  let hours = date.getHours()
  hours = hours > 9 ? hours : `0${hours}`
  const minutes = date.getMinutes()

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`
}
