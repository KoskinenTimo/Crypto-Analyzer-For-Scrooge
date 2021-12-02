import React, { useState } from "react"

// Components
import Header from "./Header"
import DateInputForm from './DateInputForm'
import ErrorMessage from "./ErrorMessage"
import DataView from "./DataView"


function App() {
  const [ fromDateTimeStamp, setFromDateTimeStamp ] = useState('')
  const [ toDateTimeStamp, setToDateTimeStamp ] = useState('')
  const [ error, setError ] = useState('')

  
  return (
    <div className="App">
    
      <Header />
      <ErrorMessage 
        error={error}
        setError={setError}
      />
      <DateInputForm
        setFromDateTimeStamp={setFromDateTimeStamp}
        setToDateTimeStamp={setToDateTimeStamp}
        setError={setError}
        error={error}
      />
      <DataView
        fromDateTimeStamp={fromDateTimeStamp}        
        toDateTimeStamp={toDateTimeStamp}
        setFromDateTimeStamp={setFromDateTimeStamp}
        setToDateTimeStamp={setToDateTimeStamp}
      />
    </div>
  );
}

export default App;
