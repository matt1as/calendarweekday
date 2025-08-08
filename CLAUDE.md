# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React calendar application built with Create React App that displays week numbers and allows users to:
- Select dates from a visual calendar
- Input week numbers directly to see corresponding date ranges
- Input years to change the calendar view
- View the start and end dates for any given week

## Commands

### Development
- `npm start` - Start development server (runs on http://localhost:3000)
- `npm test` - Run tests in interactive watch mode
- `npm run build` - Build production bundle to `build/` folder

### Testing
- Single test: `npm test -- --testNamePattern="test name"`
- Coverage: `npm test -- --coverage --watchAll=false`

## Architecture

The application is a single-page React app with the following structure:

### Main Component (`src/App.js`)
- **State Management**: Uses React hooks for date, week number, year, and date range states
- **Date Calculations**: Leverages `date-fns` library for week calculations and date formatting
- **UI Framework**: Material-UI components for consistent styling and responsive design

### Key Dependencies
- **react-calendar**: Provides the visual calendar component
- **date-fns**: Handles date calculations, week number logic, and formatting
- **@mui/material**: Material-UI components for forms and layout
- **@emotion/react & @emotion/styled**: CSS-in-JS styling (Material-UI dependency)

### Date Logic
- Week starts on Monday (`weekStartsOn: 1` in date-fns options)
- Week numbers follow ISO 8601 standard
- Input validation for week numbers (1-53) and years (1-9999)
- Automatic date range calculation when week/year changes

### State Flow
1. Calendar selection updates date → calculates week number and year
2. Week number input → calculates corresponding dates and updates calendar
3. Year input → recalculates dates for current week in new year
4. All changes trigger `updateDates()` to refresh start/end date display

## File Structure
- `src/App.js` - Main application component with all logic
- `src/index.js` - React app entry point
- `public/` - Static assets and HTML template
- Standard Create React App structure for tests and utilities