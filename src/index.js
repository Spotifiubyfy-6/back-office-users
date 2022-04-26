import ReactDOM from 'react-dom/client';
import App from './App';
import APIHandler from './classes/APIHandler'
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
let apiHandler = new APIHandler();
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/app" element={<App apiHandler = {apiHandler}/>} />    
        </Routes>
    </BrowserRouter>
    );
