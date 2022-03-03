import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getAllEvents } from "../../solana/functions";
import { Event } from "../../solana/models";
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';


export function Eventss() {
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
            {/* <GetEvents /> */}

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

export function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/events`).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(json => setEvents((json.items as any[]).map(event => {
            return {
                ...event,
                resolution_date: new Date(parseInt(event.resolution_date)).toLocaleDateString()
            } as Event
        })))
    }, [])

    return (
        <div>
            <Button variant="contained" onClick={() => navigate('/newevent')}>Request New Event</Button>

            <Grid container>
                {events.length > 0 && events.map(e =>
                    <Grid item lg={6} key={e.name}>
                        <Card variant="outlined" style={{ margin: "40px", padding: "20px" }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {e.name}
                                </Typography>
                                <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
                                    {"category: " + e.category}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {"description: " + e.description}
                                </Typography>
                                <Typography variant="body2">
                                    {"resolves at " + e.resolution_date}
                                </Typography>

                                <div style={{ marginTop: '20px'}}>
                                    <Button variant="contained" style={{ marginRight: "10px" }}>Buy Yes</Button>
                                    <Button variant="contained">Buy No</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </div>

    );
}
