import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { getWeek } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const weekNumber = getWeek(date, { weekStartsOn: 1 });

  return (
    <div className="App">
      <h1>Calendar with Week Number</h1>
      <div className="calendar-container">
        <Calendar onChange={onChange} value={date} />
        <div className="week-number">
          <h2>Selected Week:</h2>
          <p>{weekNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
