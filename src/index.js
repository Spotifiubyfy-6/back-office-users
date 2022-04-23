import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import APIHandler from './classes/APIHandler'

const root = ReactDOM.createRoot(document.getElementById('root'));
let apiHandler = new APIHandler();
root.render(<App apiHandler = {apiHandler}/>);
