import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getAllEvents } from "../../solana/functions";
import { Event } from "../../solana/models";
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';


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
         <GetEvents />

         {events.map(event => (
            // <EventComponent
            //    key={event.eventid!.toString()}
            //    event={event}
            //    setEvents={setEvents} />

            <div key={event.eventid!.toString()} style={{ border: '1px solid black', padding: '15px', marginBottom: '10px' }}>
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

export function GetEvents() {
   const [initialState, setInitialState] = useState<Event[]>([]);
   useEffect(() => {
      fetch('http://ec2-35-175-246-215.compute-1.amazonaws.com:3000/api/events').then(res => {
         if (res.ok) {
            return res.json()
         }
      }).then(jsonResponse => setInitialState(jsonResponse.items))
   }, [])

   return (
      <div>
         <Grid container>
            {initialState.length > 0 && initialState.map(e =>
               <Grid item>
                  <Card variant="outlined" style={{ margin: "10px" }}>
                     <CardContent>

                        <Typography variant="h5" component="div">
                           {e.name}

                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                           {"category: " + e.category}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                           {"description: " + e.description}
                        </Typography>
                        <Typography variant="body2">
                           {"expires at " + readTimestamp(e.resolution_date)}
                        </Typography>
                     </CardContent>
                  </Card>
               </Grid>
            )}
         </Grid>
      </div>

   );
}

function readTimestamp(timestamp: string) {
   let a = parseInt(timestamp);
   a = a / 1000000; //time is now in seconds since jan 1 1601
   let seconds = 11644473600;//seconds between jan 1 1601 and jan 1 1970
   a = a - seconds; //time in seconds since jan 1 1970
   a = a * 1000;//miliseconds since jan 1 1970 (javascript timestamp format)
   let date = new Date(a);
   return date.toLocaleDateString("en-US");
}