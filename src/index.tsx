import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { Admin } from './components/admin/Admin';
import { EventDetail } from './components/events/EventDetail';
import { Events } from './components/events/Events';
import { NewEvent } from './components/events/NewEvent';
import { Portfolio } from './components/portfolio/Portfolio';

ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="events" element={<Events />} />
                    <Route path="portfolio" element={<Portfolio />} />
                    <Route path="admin" element={<Admin />} />
                    <Route path="newevent" element={<NewEvent />} />
                    <Route path="event/:eventid" element={<EventDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById('app')
);
