import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { format, setWeek, startOfWeek, endOfWeek } from 'date-fns';
import App from './App';

// Helper function to get week calculation results like the app does
const calculateWeekDates = (week, year) => {
  const firstDayOfWeek = startOfWeek(setWeek(new Date(year, 0, 1), week, { weekStartsOn: 1 }), { weekStartsOn: 1 });
  const lastDayOfWeek = endOfWeek(firstDayOfWeek, { weekStartsOn: 1 });
  return {
    start: format(firstDayOfWeek, 'MMM dd, yyyy'),
    end: format(lastDayOfWeek, 'MMM dd, yyyy')
  };
};

describe('Calendar Week Application', () => {
  test('renders week calendar application', () => {
    render(<App />);
    expect(screen.getByText(/Calendar Week Navigator/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Week Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
  });

  test('displays current week and year on initial render', () => {
    render(<App />);
    
    // Check that week number and year inputs have initial values
    const weekInput = screen.getByLabelText(/Week Number/i);
    const yearInput = screen.getByLabelText(/Year/i);
    
    expect(weekInput.value).toBeTruthy();
    expect(yearInput.value).toBeTruthy();
    expect(parseInt(yearInput.value)).toBeGreaterThanOrEqual(2024);
  });

  test('calculates correct dates for week 1 of 2024', async () => {
    render(<App />);
    
    const weekInput = screen.getByLabelText(/Week Number/i);
    const yearInput = screen.getByLabelText(/Year/i);
    
    // Set to week 1, 2024
    fireEvent.change(yearInput, { target: { value: '2024' } });
    fireEvent.change(weekInput, { target: { value: '1' } });
    
    await waitFor(() => {
      const expectedDates = calculateWeekDates(1, 2024);
      expect(screen.getByText(expectedDates.start)).toBeInTheDocument();
      expect(screen.getByText(expectedDates.end)).toBeInTheDocument();
    });
  });

  test('calculates correct dates for week 53 of 2020 (leap year with 53 weeks)', async () => {
    render(<App />);
    
    const weekInput = screen.getByLabelText(/Week Number/i);
    const yearInput = screen.getByLabelText(/Year/i);
    
    // Set to week 53, 2020 (2020 was a leap year with 53 weeks)
    fireEvent.change(yearInput, { target: { value: '2020' } });
    fireEvent.change(weekInput, { target: { value: '53' } });
    
    await waitFor(() => {
      const expectedDates = calculateWeekDates(53, 2020);
      expect(screen.getByText(expectedDates.start)).toBeInTheDocument();
      expect(screen.getByText(expectedDates.end)).toBeInTheDocument();
    });
  });

  test('calculates correct dates for week 26 of 2023 (mid-year)', async () => {
    render(<App />);
    
    const weekInput = screen.getByLabelText(/Week Number/i);
    const yearInput = screen.getByLabelText(/Year/i);
    
    // Set to week 26, 2023 (approximately mid-year)
    fireEvent.change(yearInput, { target: { value: '2023' } });
    fireEvent.change(weekInput, { target: { value: '26' } });
    
    await waitFor(() => {
      const expectedDates = calculateWeekDates(26, 2023);
      expect(screen.getByText(expectedDates.start)).toBeInTheDocument();
      expect(screen.getByText(expectedDates.end)).toBeInTheDocument();
    });
  });

  test('handles invalid week number input', async () => {
    render(<App />);
    
    const weekInput = screen.getByLabelText(/Week Number/i);
    
    // Test invalid week numbers
    fireEvent.change(weekInput, { target: { value: '0' } });
    expect(weekInput.value).toBe('');
    
    fireEvent.change(weekInput, { target: { value: '54' } });
    expect(weekInput.value).toBe('');
    
    fireEvent.change(weekInput, { target: { value: '-1' } });
    expect(weekInput.value).toBe('');
  });

  test('handles invalid year input', async () => {
    render(<App />);
    
    const yearInput = screen.getByLabelText(/Year/i);
    
    // Test invalid years
    fireEvent.change(yearInput, { target: { value: '0' } });
    expect(yearInput.value).toBe('');
    
    fireEvent.change(yearInput, { target: { value: '10000' } });
    expect(yearInput.value).toBe('');
    
    fireEvent.change(yearInput, { target: { value: '-1' } });
    expect(yearInput.value).toBe('');
  });

  test('week calculation edge case: new year week transition', async () => {
    render(<App />);
    
    const weekInput = screen.getByLabelText(/Week Number/i);
    const yearInput = screen.getByLabelText(/Year/i);
    
    // Test week 1 of various years to ensure proper year boundary handling
    const testYears = [2021, 2022, 2023, 2024, 2025];
    
    for (const year of testYears) {
      fireEvent.change(yearInput, { target: { value: year.toString() } });
      fireEvent.change(weekInput, { target: { value: '1' } });
      
      await waitFor(() => {
        const expectedDates = calculateWeekDates(1, year);
        expect(screen.getByText(expectedDates.start)).toBeInTheDocument();
        expect(screen.getByText(expectedDates.end)).toBeInTheDocument();
      });
    }
  });

  test('week calculation consistency: same week different years', async () => {
    render(<App />);
    
    const weekInput = screen.getByLabelText(/Week Number/i);
    const yearInput = screen.getByLabelText(/Year/i);
    
    // Test that week 10 in different years produces consistent results
    const testCases = [
      { year: 2020, week: 10 },
      { year: 2021, week: 10 },
      { year: 2022, week: 10 },
      { year: 2023, week: 10 },
      { year: 2024, week: 10 }
    ];
    
    for (const testCase of testCases) {
      fireEvent.change(yearInput, { target: { value: testCase.year.toString() } });
      fireEvent.change(weekInput, { target: { value: testCase.week.toString() } });
      
      await waitFor(() => {
        const expectedDates = calculateWeekDates(testCase.week, testCase.year);
        expect(screen.getByText(expectedDates.start)).toBeInTheDocument();
        expect(screen.getByText(expectedDates.end)).toBeInTheDocument();
      });
    }
  });
});
