import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global stylesheet (e.g., Tailwind CSS, base styles)
import App from './App'; // Root App component of the entire application
import reportWebVitals from './reportWebVitals'; // Web Vitals for performance monitoring
import { Provider } from 'react-redux'; // Makes Redux store available to the app
import { store } from './store/store'; // Redux store instance
import { BrowserRouter } from 'react-router-dom'; // Enables client-side routing using browser history

// Create the root DOM node using React 18's new root API
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render the entire app inside React.StrictMode for highlighting potential issues
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Redux global state provider */}
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true, // Enable React Router v7 behavior early (avoids future warnings)
        }}
      >
        <App /> {/* Main component containing the app routes and layout */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// Report performance metrics (optional: log or send to an analytics endpoint)
reportWebVitals();
