import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getAllEvents } from "../../solana/functions";
import { Event } from "../../solana/models";
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';

export function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/events`).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(json => setEvents(((json && json.items ? json.items : []) as any[]).map(event => {
            return {
                ...event,
                resolution_date: new Date(parseInt(event.resolution_date)).toLocaleDateString()
            } as Event
        })))
    }, [])

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: '30px', width: '70%' }}>
            <Button variant="contained" onClick={() => navigate('/newevent')}>Request New Event</Button>

            {events.length ? <Grid container>
                {events.length > 0 && events.map(e =>
                    <Grid item lg={4} key={e.name}>
                        <Card variant="outlined" style={{ margin: "40px", padding: "20px", borderRadius: '20px' }}>
                            <CardContent>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <img src={e.image_link} style={{objectFit: 'cover', width: '35px', height: '35px', borderRadius: '100%', marginRight: '10px'}}></img>
                                    <Typography variant="h5" component="div">
                                        {e.name}
                                    </Typography>
                                </div>
                                <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
                                    {"category: " + e.category}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {"description: " + e.description}
                                </Typography>
                                <Typography variant="body2">
                                    {"resolves on " + e.resolution_date}
                                </Typography>

                                <Button style={{ marginTop: '20px' }} variant="contained">TRADE</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid> : <Typography style={{marginTop: '80px'}} variant="h3" component="div">No Events</Typography>}
        </div>
    );
}
