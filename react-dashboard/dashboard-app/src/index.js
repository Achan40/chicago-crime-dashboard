import React from 'react';
import ReactDOM from 'react-dom';

import DropDowns from './DropDowns';
import Footer from './Footer'

import './styles/general.css'

ReactDOM.render(
  <React.StrictMode>
    <DropDowns />
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);

