import React, { useState } from "react"

// Components
import Header from "./components/Header"
import DateInputForm from './components/DateInputForm'
import ErrorMessage from "./components/ErrorMessage"
import Footer from "./components/Footer"
import DataView from "./components/DataView"
import NavBar from "./components/NavBar"


function App() {
  const [ fromDateTimeStamp, setFromDateTimeStamp ] = useState('')
  const [ toDateTimeStamp, setToDateTimeStamp ] = useState('')
  const [ error, setError ] = useState('')

  
  return (
    <div className="wrapper">    
      <Header />
      <NavBar />
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
