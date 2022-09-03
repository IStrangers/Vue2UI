
function getYearMonthDay(date) {
  if(!date) {
    return [null,null,null]
  }
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return [year,month,day]
}

export {
  getYearMonthDay
}