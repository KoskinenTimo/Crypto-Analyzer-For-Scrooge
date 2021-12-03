import React, { useState } from "react"

// Components
import Header from "./Header"
import DateInputForm from './DateInputForm'
import ErrorMessage from "./ErrorMessage"
import DataView from "./DataView"
import Footer from "./Footer"


function App() {
  const [ fromDateTimeStamp, setFromDateTimeStamp ] = useState('')
  const [ toDateTimeStamp, setToDateTimeStamp ] = useState('')
  const [ error, setError ] = useState('')

  
  return (
    <div className="wrapper">
    
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
        setError={setError}
      />
      <Footer />
    </div>
  );
}

export default App;
