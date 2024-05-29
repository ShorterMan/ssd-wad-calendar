import { useState } from 'react';
import Calendar from './Components/Calendar/Calendar';
import './App.css';

function App() {
  const [currDate, setCurrDate] = useState(new Date());
  let locale = "id-id";
  let month = currDate.toLocaleString(locale, { month: "long" });
  let year = currDate.getFullYear();

  return (
    <>
      <h1>{month} {year}</h1>
      <Calendar date={currDate}/>
    </>
  )
}

export default App
