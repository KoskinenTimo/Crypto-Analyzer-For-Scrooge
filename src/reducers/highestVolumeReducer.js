const initialState = []

const highestVolumeReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_HIGHEST_VOLUME':
    return state = action.data
  case 'RESET_HIGHEST_VOLUME':
    return state = initialState
  default:
    return state
  }
}

export const createHighestVolume = (content) => {
  const highestVolumeAndDate = getHighestTradingVolumeAndDate(content)
  return {
    type: 'NEW_HIGHEST_VOLUME',
    data: highestVolumeAndDate
  }
}

export const resetHighestVolume = () => {
  return {
    type: 'RESET_HIGHEST_VOLUME'
  }
}

/**
   * Gets the highest volume trading day and volume out of the
   * given data array of date-volume pairs
   * @param {[number[]]} arrayOfDatesWithVolume
   * @returns {number[]}
   */
const getHighestTradingVolumeAndDate = (arrayOfDatesWithVolume) => {
  return arrayOfDatesWithVolume.reduce((previousValue, currentValue) => {
    const currentValueVolumeHigher = currentValue[1] > previousValue[1]
    return currentValueVolumeHigher ? currentValue : previousValue
  })
}


export default highestVolumeReducer