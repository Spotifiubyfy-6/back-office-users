import ReactDOM from 'react-dom/client';
import App from './App';
import APIHandler from './classes/APIHandler'
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router-dom';
import Users from './routes/users'
import Metrics from './routes/metrics'
import Songs from './routes/songs';
import Albums from './routes/albums';
import Artists from './routes/artists';


const root = ReactDOM.createRoot(document.getElementById('root'));
let apiHandler = new APIHandler();
root.render(
    
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App apiHandler = {apiHandler}/>}>    
                    <Route path="/userstable" element={<Users apiHandler = {apiHandler} />} />
                    <Route path="/metrics" element={<Metrics/>} />
                    <Route path="/songs" element={<Songs apiHandler = {apiHandler} />} />
                    <Route path="/albums" element={<Albums apiHandler = {apiHandler} />} />
                    <Route path="/artists" element={<Artists apiHandler = {apiHandler} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
