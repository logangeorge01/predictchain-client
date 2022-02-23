// import React from 'react';
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import './index.css';
import { App } from './App';
import { EventsComponent } from './components/events/Events';
import { NewEventComponent } from "./components/events/NewEvent";
import { Portfolio } from "./components/Portfolio/Portfolio";

render(
   <BrowserRouter>
      <Routes>
         <Route path="/" element={<App />}>
            <Route path="events" element={<EventsComponent />} />
            <Route path="newevent" element={<NewEventComponent />} />
            <Route path="portfolio" element={<Portfolio />} />
            {/* <Route path="newmarket" element={<NewMarketComponent />} /> */}
            
         </Route>
      </Routes>
   </BrowserRouter>,
   document.getElementById("root")
);
