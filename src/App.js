import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { getWeek, getYear, startOfWeek, endOfWeek, format } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import { 
  Container, 
  Box, 
  TextField, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Chip,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#7c3aed',
    },
    background: {
      default: '#f8fafc',
    },
  },
  typography: {
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      color: '#ffffff',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    },
    h4: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
});

function App() {
  const [date, setDate] = useState(new Date());
  const [weekNumber, setWeekNumber] = useState(getWeek(new Date(), { weekStartsOn: 1 }));
  const [year, setYear] = useState(getYear(new Date()));
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    updateDates(weekNumber, year);
  }, [weekNumber, year]);

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

  const updateDates = (week, yearNum) => {
    const firstDayOfWeek = startOfWeek(new Date(yearNum, 0, (week - 1) * 7 + 1), { weekStartsOn: 1 });
    const lastDayOfWeek = endOfWeek(new Date(firstDayOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000), { weekStartsOn: 1 });

    setStartDate(format(firstDayOfWeek, 'MMM dd, yyyy'));
    setEndDate(format(lastDayOfWeek, 'MMM dd, yyyy'));
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
        py: 4
      }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={4}>
            <Typography variant="h1" component="h1" gutterBottom sx={{ mb: 2 }}>
              Week {weekNumber}
            </Typography>
            <Typography variant="h6" sx={{ color: 'white', opacity: 0.9 }}>
              Calendar Week Navigator
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} lg={8}>
              <Paper 
                elevation={8}
                sx={{ 
                  borderRadius: 3,
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.98)'
                }}
              >
                <Box p={4}>
                  <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={7}>
                      <Box sx={{ 
                        '& .react-calendar': {
                          width: '100%',
                          border: 'none',
                          borderRadius: '16px',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                          fontFamily: theme.typography.fontFamily,
                        },
                        '& .react-calendar__tile': {
                          borderRadius: '8px',
                          margin: '2px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease',
                        },
                        '& .react-calendar__tile--active': {
                          background: theme.palette.primary.main + ' !important',
                          color: 'white !important',
                          fontWeight: 'bold',
                        },
                        '& .react-calendar__tile:hover': {
                          background: theme.palette.primary.light + ' !important',
                          color: 'white',
                        },
                        '& .react-calendar__navigation button': {
                          fontSize: '16px',
                          fontWeight: '600',
                          color: theme.palette.primary.main,
                        },
                        '& .react-calendar__month-view__weekdays': {
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          fontWeight: 'bold',
                          fontSize: '0.75em',
                          color: theme.palette.text.secondary,
                        }
                      }}>
                        <Calendar onChange={onChange} value={date} />
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={5}>
                      <Box display="flex" flexDirection="column" gap={3}>
                        <Card sx={{ background: theme.palette.primary.main }}>
                          <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                            <Typography variant="h2" sx={{ fontSize: '3rem', mb: 1 }}>
                              📅
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                              Week {weekNumber}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                              of {year}
                            </Typography>
                          </CardContent>
                        </Card>

                        <Box display="flex" flexDirection="column" gap={2}>
                          <TextField
                            label="Week Number"
                            type="number"
                            value={weekNumber}
                            onChange={handleWeekNumberChange}
                            variant="outlined"
                            fullWidth
                            inputProps={{ min: 1, max: 53 }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                              }
                            }}
                          />
                          <TextField
                            label="Year"
                            type="number"
                            value={year}
                            onChange={handleYearChange}
                            variant="outlined"
                            fullWidth
                            inputProps={{ min: 1, max: 9999 }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                              }
                            }}
                          />
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {startDate && endDate && (
            <Box mt={4} display="flex" justifyContent="center">
              <Card 
                sx={{ 
                  background: 'rgba(255,255,255,0.98)',
                  borderRadius: 3,
                  maxWidth: 600,
                  width: '100%'
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" justifyContent="center" gap={2} flexWrap="wrap">
                    <Typography variant="h2" sx={{ fontSize: '2rem' }}>
                      📅
                    </Typography>
                    <Typography variant="h6" component="span" color="primary" fontWeight="600">
                      Week {weekNumber}, {year}:
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="wrap" justifyContent="center">
                      <Chip 
                        label={startDate} 
                        color="primary" 
                        variant="filled"
                        sx={{ fontSize: '0.9rem', fontWeight: '500' }}
                      />
                      <Typography variant="h6" sx={{ alignSelf: 'center' }}>—</Typography>
                      <Chip 
                        label={endDate} 
                        color="secondary" 
                        variant="filled"
                        sx={{ fontSize: '0.9rem', fontWeight: '500' }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
