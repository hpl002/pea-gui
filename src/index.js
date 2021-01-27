import React from 'react';
import ReactDOM from 'react-dom';
 
 
import Wizard from './components/wizard';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './scss/app.module.scss';

ReactDOM.render(
  <React.StrictMode style={{"height":"100vh"}}>
    <Wizard style={{"height":"100vh"}}/>
  </React.StrictMode>,
  document.getElementById('root')
  ); 