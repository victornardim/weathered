import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider as AlertProvider } from 'react-alert';
import reportWebVitals from './reportWebVitals';

import Alert from './component/Alert';

import './style/component/Alert.css'

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={Alert} timeout={5000}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
