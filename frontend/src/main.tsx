// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <App />
// )

import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App.tsx';
import ReactDOM from 'react-dom/client';  // Updated import
import './index.css';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);  // Use createRoot
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}