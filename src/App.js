import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { getWeek, getDate, getMonth, getYear, startOfWeek, endOfWeek } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import { Container, Box, TextField, Typography } from '@mui/material';

function App() {
  // State declarations
  const [date, setDate] = useState(new Date());
  const [weekNumber, setWeekNumber] = useState(getWeek(new Date(), { weekStartsOn: 1 }));
  const [year, setYear] = useState(getYear(new Date()));
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    updateDates(weekNumber, year);
  }, []);

  // Handler for date change in the calendar
  // Updates date, week number, and year states when a new date is selected
  const onChange = (newDate) => {
    setDate(newDate);
    const weekNum = getWeek(newDate, { weekStartsOn: 1 });
    const yearNum = getYear(newDate);
    setWeekNumber(weekNum);
    setYear(yearNum);
    updateDates(weekNum, yearNum);
  };

  // Updates start and end dates for a given week and year
  // Calculates the first and last day of the week, then formats and sets the dates
  const updateDates = (week, yearNum) => {
    const firstDayOfWeek = startOfWeek(new Date(yearNum, 0, (week - 1) * 7 + 1), { weekStartsOn: 1 });
    const lastDayOfWeek = endOfWeek(new Date(firstDayOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000), { weekStartsOn: 1 });

    setStartDate(getDate(firstDayOfWeek) + '/' + (getMonth(firstDayOfWeek) + 1) + '/' + getYear(firstDayOfWeek));
    setEndDate(getDate(lastDayOfWeek) + '/' + (getMonth(lastDayOfWeek) + 1) + '/' + getYear(lastDayOfWeek));
  };

  // Handles changes to the week number input
  // Validates input, updates week number state, and refreshes dates if valid
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

  // Manages changes to the year input
  // Validates input, updates year state, and refreshes dates if valid
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
    <Container maxWidth="md">
      <Box my={4} textAlign="center">
        <Typography variant="h1" component="h1" gutterBottom>
          {weekNumber}
        </Typography>
        {/* Rest of your existing code */}
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="center">
          <Calendar onChange={onChange} value={date} />
          <Box ml={{ sm: 2 }} mt={{ xs: 2, sm: 0 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box mb={1}>
                <TextField
                  label="Week Number"
                  type="number"
                  value={weekNumber}
                  onChange={handleWeekNumberChange}
                />
              </Box>
              <Box>
                <TextField
                  label="Year"
                  type="number"
                  value={year}
                  onChange={handleYearChange}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        {startDate && endDate && (
          <Box mt={2}>
            <Typography variant="body1">
              The dates for week {weekNumber} of {year} are {startDate} to {endDate}.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
