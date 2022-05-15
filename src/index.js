import ReactDOM from 'react-dom/client';
import App from './App';
import APIHandler from './classes/APIHandler'
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import Users from './routes/users'
import Metrics from './routes/metrics'
import Content from './routes/Content'


const root = ReactDOM.createRoot(document.getElementById('root'));
let apiHandler = new APIHandler();
root.render(
    
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App apiHandler = {apiHandler}/>}>    
                    <Route path="/userstable" element={<Users apiHandler = {apiHandler} />} />
                    <Route path="/metrics" element={<Metrics apiHandler = {apiHandler}/>} />
                    <Route path="/content" element={<Content apiHandler = {apiHandler} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
