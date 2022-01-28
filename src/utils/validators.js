/**
 * Checks if the input date value is in correct form
 * @param {string} value
 * @returns {boolean}
 */
export const isValidDateString = (value) => {
  const regex = /^\d{2}[/]\d{2}[/]\d{4}$/g
  return regex.test(value)
}

/**
 * Checks if the input date is a real date
 * @param {string} value
 * @returns {boolean}
 */
export const isValidDate = (value) => {
  if (value.length === 10) {
    const dateParts = value.split('/')
    const day = parseInt(dateParts[0],10)
    const month = parseInt(dateParts[1],10)
    const year = parseInt(dateParts[2],10)
    if (
      year < 1970 ||
        year > new Date().getFullYear() ||
        month === 0 ||
        month > 12
    ) {
      return false
    }
    if (
      year === new Date().getFullYear() &&
        month > new Date().getMonth()+1
    ) {
      return false
    }
    if (
      year === new Date().getFullYear() &&
        month === new Date().getMonth()+1 &&
        day > new Date().getDate()
    ) {
      return false
    }

    const daysInEachMonth = [ 31,28,31,30,31,30,31,31,30,31,30,31 ]

    if (year % 4) {
      daysInEachMonth[1] = 29
    }
    if (day > 0 && day > daysInEachMonth[month - 1]) {
      return false
    }
  }
  return true
}