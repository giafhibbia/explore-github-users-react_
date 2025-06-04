// src/App.tsx

// Import routing components from React Router v6+
// 'Routes' acts as the container for all route definitions
// 'Route' maps a specific path to a React component
import { Routes, Route } from 'react-router-dom';

// Import the component that should render for the home ("/") route
import HomePage from './pages/HomePage';

// Import optional global styles (e.g., layout, Tailwind, resets)
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Define all application routes inside <Routes> */}
      <Routes>
        {/* Route for the root path ('/'), renders the HomePage component */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
