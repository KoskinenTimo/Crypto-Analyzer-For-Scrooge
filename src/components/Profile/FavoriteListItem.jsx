import React, { useEffect, useState } from 'react'
import { coins, currencies } from '../../utils/constants'
import { parseNumber, parseToDate } from '../../utils/parsers'
import DeleteFavoriteButton from './DeleteFavoriteButton'
import NoteAddEditInput from './NoteAddEditInput'
import './FavoriteListItem.scss'

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
      <div className='profile-favlist-item'>
        <div className='profile-favlist-item__flexbox'>
          <div>
            <p className='profile-favlist-item__txt'>From Date: {parseToDate(parsedData.fromDate)}</p>
            <p className='profile-favlist-item__txt'>To Date: {parseToDate(parsedData.toDate)}</p>
            <p className='profile-favlist-item__txt'>Coin: {parsedData.coin}</p>
            <p className='profile-favlist-item__txt'>Profit per Coin: {parsedData.profit} {parsedData.currency}</p>
            <p className='profile-favlist-item__txt'>Highest Volume: {parsedData.volume} {parsedData.currency}</p>
            <p className='profile-favlist-item__txt'>{parsedData.note && `Note: ${parsedData.note}`}</p>
          </div>
          <div className='profile-favlist-item-buttons-flexbox'>
            {
              editNote
                ?
                <button
                  className='profile-favlist-item__button'
                  onClick={() => setEditNote(false)}
                >
                Cancel Edit
                </button>
                :
                <button
                  className='profile-favlist-item__button'
                  onClick={() => setEditNote(true)}
                >
                  Add/Edit Note
                </button>
            }
            {
              deleteFav
                ?
                <>
                  <button
                    className='profile-favlist-item__button'
                    onClick={() => setDeleteFav(false)}
                  >
                    Cancel
                  </button>
                  <DeleteFavoriteButton id={data.id} />
                </>
                :
                <button
                  className='profile-favlist-item__button'
                  onClick={() => setDeleteFav(true)}
                >
                  Delete
                </button>
            }
          </div>
        </div>
        {editNote && <NoteAddEditInput data={data} setEditNote={setEditNote} />}
      </div>
    )
  }
  return (
    <div className='profile-favlist-item'>
      <p className='profile-favlist-item__txt'>Loading...</p>
    </div>
  )
}

export default FavoriteListItem