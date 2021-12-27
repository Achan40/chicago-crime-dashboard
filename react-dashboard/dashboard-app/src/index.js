import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CommDropDown from './CommDropDown';
import Tmp from './tmp';

ReactDOM.render(
  <React.StrictMode>
    <CommDropDown />
    <App />
    <Tmp />
  </React.StrictMode>,
  document.getElementById('root')
);

