import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getAllEvents } from "../../solana/functions";
import { Event } from "../../solana/models";
import { Button } from '@mui/material';


export function Events() {
   const [events, setEvents] = useState<Event[]>([]);
   let navigate = useNavigate();

   useEffect(() => {
      // getAllEvents().then((events: Event[]) => {
      //    // console.log(events);
      //    setEvents(events);
      // });
   }, []);

   return (
      <div>
         <Button variant="contained" onClick={() => navigate('/newevent')}>Create Event</Button>

         {events.map(event => (
            // <EventComponent
            //    key={event.eventid!.toString()}
            //    event={event}
            //    setEvents={setEvents} />

            <div key={event.eventid!.toString()} style={{border: '1px solid black', padding: '15px', marginBottom: '10px'}}>
               {/* <div style={{marginBottom: '10px'}}>
                  <img alt='' height='40px' src={event.image0}></img>
                  <img alt='' height='40px' style={{marginLeft: '10px'}} src={event.image1 ?? ''}></img>
               </div>
               
               <div style={{fontWeight: 'bold', fontSize: '25px'}}>{event.description}</div><br />
               <div>{event.league}</div><br />
               <div>{new Date(event.starttime).toLocaleString()}</div><br /> */}
            </div>
         ))}
      </div>
   );
}
