import React from "react"


const DataView = ({
  fromDateTimeStamp,
  toDateTimeStamp
}) => {


  const addOneDay = dateToIncrement => {
    const date = new Date(dateToIncrement)
    date.setDate(date.getDate()+1)
    const dateInMSFormat = Date.parse(date)
    return dateInMSFormat
  }
  const createDateArray = (fromDate,toDate) => {
    const firstDay = fromDate*1000
    const lastDay = toDate*1000
    let currentDay = firstDay
    const dateArray = []
    while (currentDay < lastDay) {
      dateArray.push(currentDay)
      const newDay = addOneDay(currentDay)
      currentDay = newDay
    }
    dateArray.pop()
    return dateArray
  }
  
  return(<div></div>)
}

export default DataView