import { useState,useEffect } from "react";


/**
 * Used for creating auto-input when a user is typing into
 * a field and special characters are required in the input
 * Follows state of the input and uses intervals required to 
 * inject special characters. Special character can be for 
 * example "-" or "/". 
 * @param {string} state 
 * @param {function} setState 
 * @param {string} character 
 * @param {Array<number>} interval 
 */
const useAutoInput = (state, setState, character, intervals) => {
  const [ stateWithOneCharacterLess, setStateWithOneCharacterLess ] = useState('');

  useEffect(() => {
    if (state.length) {
      if(intervals.includes(stateWithOneCharacterLess.length) && intervals.includes(state.length) && state.length === stateWithOneCharacterLess.length) {        
        setStateWithOneCharacterLess(state.slice(0, state.length - 2))
        setState(state.slice(0, state.length - 1))
      } else {
        setStateWithOneCharacterLess(state.slice(0, state.length - 1))
      }
      if (intervals.includes(state.length) && !intervals.includes(stateWithOneCharacterLess.length)) {        
        setStateWithOneCharacterLess(state)
        setState(`${state}${character}`)
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])  
}

export default useAutoInput;