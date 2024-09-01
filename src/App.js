import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { getWeek, getDate, getMonth, getYear, startOfWeek, endOfWeek } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  const [date, setDate] = useState(new Date());
  const [weekNumber, setWeekNumber] = useState(getWeek(new Date(), { weekStartsOn: 1 }));
  const [year, setYear] = useState(getYear(new Date()));
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    updateDates(weekNumber, year);
  }, []);

  const onChange = (newDate) => {
    setDate(newDate);
    const weekNum = getWeek(newDate, { weekStartsOn: 1 });
    const yearNum = getYear(newDate);
    setWeekNumber(weekNum);
    setYear(yearNum);
    updateDates(weekNum, yearNum);
  };

  const updateDates = (week, yearNum) => {
    const firstDayOfWeek = startOfWeek(new Date(yearNum, 0, (week - 1) * 7 + 1), { weekStartsOn: 1 });
    const lastDayOfWeek = endOfWeek(new Date(firstDayOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000), { weekStartsOn: 1 });

    setStartDate(getDate(firstDayOfWeek) + '/' + (getMonth(firstDayOfWeek) + 1) + '/' + getYear(firstDayOfWeek));
    setEndDate(getDate(lastDayOfWeek) + '/' + (getMonth(lastDayOfWeek) + 1) + '/' + getYear(lastDayOfWeek));
  };

  const handleWeekNumberChange = (e) => {
    const newWeekNumber = parseInt(e.target.value, 10);
    if (isNaN(newWeekNumber) || newWeekNumber < 1 || newWeekNumber > 53) {
      setWeekNumber('');
      setStartDate('');
      setEndDate('');
      return;
    }
    setWeekNumber(newWeekNumber);
    updateDates(newWeekNumber, year);
    setDate(new Date(year, 0, (newWeekNumber - 1) * 7 + 1));
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    if (isNaN(newYear) || newYear < 1 || newYear > 9999) {
      setYear('');
      setStartDate('');
      setEndDate('');
      return;
    }
    setYear(newYear);
    updateDates(weekNumber, newYear);
    setDate(new Date(newYear, 0, (weekNumber - 1) * 7 + 1));
  };

  return (
    <div className="App">
      <h1>Calendar with Week Number</h1>
      <div className="calendar-container">
        <Calendar onChange={onChange} value={date} />
        <div className="week-number">
          <h2>Selected Week:</h2>
          <input
            type="number"
            value={weekNumber}
            onChange={handleWeekNumberChange}
          />
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
          />
        </div>
      </div>
      {startDate && endDate && (
        <p>
          The dates for week {weekNumber} of {year} are {startDate} to {endDate}.
        </p>
      )}
    </div>
  );
}

export default App;
