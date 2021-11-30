import React, { useEffect, useState } from "react"

// Components
import Header from "./Header"
import DateInputForm from './DateInputForm'

// Services
import coinGeckoService from './services/coinGeckoApiService'



function App() {
  const [ fromDateInputValue, setFromDateInputValue ] = useState('')
  const [ toDateInputValue, setToDateInputValue ] = useState('')
  const [ path, setPath ] = useState()
  const [ error, setError ] = useState('')
  useEffect(() => {
    if(path) {
      console.log(path)
      coinGeckoService.getBitcoinChartRange("test","test")
    }    
  }, [path])

  return (
    <div className="App">
    
      <Header />
      <DateInputForm 
        fromDateInputValue={fromDateInputValue}
        setFromDateInputValue={setFromDateInputValue}
        toDateInputValue={toDateInputValue}
        setToDateInputValue={setToDateInputValue}
        setPath={setPath}
      />
    </div>
  );
}

export default App;
