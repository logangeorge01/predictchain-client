import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getAllEvents } from "../../solana/functions";
import { Event } from "../../solana/models";
import { Button, Card, CardContent, Typography, Grid, TextField, Stack } from '@mui/material';

export function Portfolio() {
    const [events, setEvents] = useState<Event[]>([]);
    let navigate = useNavigate();

    let bought: number[] = [0.25, 0.50, 0.84,0.25, 0.50, 0.84];
    let current: number[] = [0.56, 0.43, 0.90, 0.56, 0.43, 0.90];

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/events`).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(json => setEvents(((json && json.items ? json.items : []) as any[]).map(event => {
            return {
                ...event,
                resolutionDate: new Date(parseInt(event.resolutionDate)).toLocaleDateString()
            } as Event
        })))
    }, [])

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: '30px', width: '70%' }}>
            <Button variant="contained" color="secondary" onClick={() => navigate('/newevent')}>Request New Event</Button>

            {events.length ? <Stack>
                {events.length > 0 && events.map(e =>
                    <div key={e.name}>
                        <Card variant="outlined" style={{ margin: "40px", padding: "20px", borderRadius: '20px' }}>
                            <CardContent>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <img src={e.imageLink} style={{ objectFit: 'cover', width: '35px', height: '35px', borderRadius: '100%', marginRight: '10px' }}></img>
                                    <Typography variant="h5" component="div">
                                        {e.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {"Resolves on " + e.resolutionDate}
                                    </Typography>
                                    <Typography variant="body2">
                                        Bought Price
                                    </Typography>
                                    <Typography variant="body2">
                                        Current Price
                                    </Typography>
                                    <Typography variant="body2">
                                        Profit
                                    </Typography>
                                    <Button onClick={() => navigate(`/event/${e.id!}`)} style={{ marginTop: '20px' }} variant="contained">TRADE</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </Stack> : <Typography style={{ marginTop: '80px' }} variant="h3" component="div">No Events</Typography>}
        </div>
    );
}

