import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ReactGA4 from 'react-ga4';
import './stylesheets/style.css';

ReactGA4.initialize('105341268528158289615');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);