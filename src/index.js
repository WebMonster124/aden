import React,{ Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";

import App from './App';
import './App.scss';

ReactDOM.render(
    <BrowserRouter>
      <Suspense fallback="...loading">
        <App />
      </Suspense>
    </BrowserRouter>,
    document.getElementById("root")
);
