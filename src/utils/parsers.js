/**
   * Turns date milliseconds/string format to YYYY-MM-DD UTC time
   * @param {number} dateMS
   * @returns {string} YYYY-MM-DD format
   */
export const parseToDate = (dateMS) => {
  const date = new Date(dateMS)
  const y = date.getUTCFullYear()
  let m = date.getUTCMonth()+1
  if( m < 10 ) m = `0${m}`
  let d = date.getUTCDate()
  if( d < 10) d = `0${d}`
  return `${y}-${m}-${d}`
}

/**
   * Turns volume number clean non-float number if needed with dots
   * between 10^3.
   * @param {number} number
   * @param {boolean} float
   * @returns {number} XXX.XXX.XXX
   */
export const parseNumber = (number,float=false) => {
  if (float) {
    number = Math.round(number)
  }
  return new Intl.NumberFormat('de-DE').format(number)
}

/**
   * Coverts a date string to UNIX timestamp
   * Builds first UTC time format and then converts
   * it to Unix timestamp
   * Works with string format "DD/MM/YEAR"
   * @param {string} dateString
   * @returns {number} Unix timestamp
   */
export const parseToTimestamp = (dateString,hour=0) => {
  const dateParts = dateString.split('/')
  const [day,month,year] = [...dateParts]
  const dateUTC = `${year}-${month}-${day}T0${hour}:00:00.000Z`
  const dateMilliseconds = Date.parse(dateUTC)
  return dateMilliseconds/1000
}