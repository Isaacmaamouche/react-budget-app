import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BudgetProvider } from "./Contexts/BudgetContext";
import { ThemeProvider } from "./Contexts/ThemeContext"



ReactDOM.hydrate(
  <React.StrictMode>
    <ThemeProvider>
      <BudgetProvider>
        <App />
      </BudgetProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();