import { ReportHandler } from 'web-vitals';

// This function allows reporting of key performance metrics
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  // Check if a valid performance reporting callback is provided
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import web-vitals functions only when needed
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Invoke all core web-vitals metrics and pass the result to the callback
      getCLS(onPerfEntry);   // Cumulative Layout Shift
      getFID(onPerfEntry);   // First Input Delay
      getFCP(onPerfEntry);   // First Contentful Paint
      getLCP(onPerfEntry);   // Largest Contentful Paint
      getTTFB(onPerfEntry);  // Time To First Byte
    });
  }
};

export default reportWebVitals;
