import React, { useEffect, useState } from 'react'
import { coins, currencies } from '../../utils/constants'
import { parseNumber, parseToDate } from '../../utils/parsers'
import DeleteFavoriteButton from './DeleteFavoriteButton'
import NoteAddEditInput from './NoteAddEditInput'


const FavoriteListItem = ({ data }) => {
  const [ parsedData, setParsedData ] = useState({})
  const [ parsed, setParsed ] = useState(false)
  const [ editNote, setEditNote ] = useState(false)
  const [ deleteFav, setDeleteFav ] = useState(false)

  useEffect(() => {
    if (data) {
      const parsedDataObject = {}
      if (data.fromDate) {
        const parsedFromDate = parseToDate(data.fromDate)
        parsedDataObject.fromDate = parsedFromDate
      }
      if (data.toDate) {
        const parsedFromData = parseToDate(data.toDate)
        parsedDataObject.toDate = parsedFromData
      }
      if (data.currency && currencies.map(c => c.id).includes(data.currency)) {
        const parsedCurrency = currencies.find(c => c.id === data.currency).name
        parsedDataObject.currency = parsedCurrency
      }
      if (data.coin && coins.map(c => c.id).includes(data.coin)) {
        const parsedCoin = coins.find(c => c.id === data.coin).name
        parsedDataObject.coin = parsedCoin
      }
      if (data.profit) {
        const parsedProfit = Number(data.profit).toFixed(2)
        parsedDataObject.profit = parsedProfit
      }
      if (data.volume) {
        const parsedVolume = parseNumber(data.volume)
        parsedDataObject.volume = parsedVolume
      }
      if (data.note) {
        parsedDataObject.note = data.note
      }
      setParsedData(parsedDataObject)
      setParsed(true)
    }
  }, [data])

  if (parsed) {
    return (
      <div className='data-card'>
        <div className='flex-row-space-btw'>
          <div>
            <p>From Date: {parseToDate(parsedData.fromDate)}</p>
            <p>To Date: {parseToDate(parsedData.toDate)}</p>
            <p>Coin: {parsedData.coin}</p>
            <p>Profit per Coin: {parsedData.profit} {parsedData.currency}</p>
            <p>Highest Volume: {parsedData.volume} {parsedData.currency}</p>
            <p>{parsedData.note && `Note: ${parsedData.note}`}</p>
          </div>
          <div className='flex-column'>
            {
              editNote
                ?
                <button onClick={() => setEditNote(false)}>Cancel Edit</button>
                :
                <button onClick={() => setEditNote(true)}>Add/Edit Note</button>
            }
            {
              deleteFav
                ?
                <>
                  <button onClick={() => setDeleteFav(false)}>Cancel</button>
                  <DeleteFavoriteButton id={data.id}/>
                </>
                :
                <button onClick={() => setDeleteFav(true)}>Delete</button>
            }
          </div>
        </div>
        {editNote && <NoteAddEditInput data={data} setEditNote={setEditNote} />}
      </div>
    )
  }
  return (
    <div className='data-card'>
      <p>Loading...</p>
    </div>
  )
}

export default FavoriteListItem