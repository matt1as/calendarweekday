# Calendar Week Navigator 📅

A modern, responsive React application for navigating calendar weeks and finding corresponding date ranges. Built with Material-UI for a beautiful, user-friendly interface.

## Features ✨

- **Interactive Calendar**: Visual calendar interface for date selection
- **Week Number Navigation**: Input week numbers (1-53) to find corresponding dates
- **Year Navigation**: Change years to view different calendar periods
- **Date Range Display**: Shows start and end dates for any selected week
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful glassmorphism design with gradient backgrounds
- **ISO 8601 Standard**: Week numbers follow international standards (Monday start)

## Screenshots 📸

The application features:
- A stunning gradient background with glassmorphism effects
- Interactive calendar with hover states and modern styling
- Input fields for week number and year with validation
- Colorful chips displaying date ranges
- Fully responsive layout that adapts to all screen sizes

## Getting Started 🚀

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/matt1as/calendarweekday.git
   cd calendarweekday
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Usage 💡

### Navigate by Calendar
- Click any date on the calendar to see its corresponding week number and year
- The date range for that week will be automatically displayed

### Navigate by Week Number
- Enter a week number (1-53) in the "Week Number" field
- The calendar will update to show that week, and date range will be displayed

### Navigate by Year
- Enter a year (1-9999) in the "Year" field
- The calendar will update to show the current week in the new year

### Date Range Display
- The app shows the start and end dates for the selected week
- Dates are formatted in an easy-to-read format (e.g., "Aug 08, 2025")
- Date ranges are displayed as colorful chips for better visibility

## Available Scripts 🛠️

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.

## Technologies Used 🛠️

- **React 18** - Modern React with hooks
- **Material-UI (MUI)** - Component library for beautiful UI
- **react-calendar** - Interactive calendar component
- **date-fns** - Modern JavaScript date utility library
- **Create React App** - Build toolchain and development server

## Week Number Logic 📊

This application follows the ISO 8601 standard for week numbering:
- Week 1 is the first week with at least 4 days in the new year
- Weeks start on Monday
- Week numbers range from 1 to 53 (some years have 53 weeks)
- The algorithm correctly handles leap years and edge cases

## Browser Support 🌐

This application supports all modern browsers including:
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Learn More 📚

You can learn more about the technologies used:
- [React Documentation](https://reactjs.org/)
- [Material-UI Documentation](https://mui.com/)
- [date-fns Documentation](https://date-fns.org/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)