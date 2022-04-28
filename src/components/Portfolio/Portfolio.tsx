import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getAllEvents } from "../../solana/functions";
import { Event } from "../../solana/models";
import { Button, Card, CardContent, Typography, Grid, TextField, Stack, Box, Paper } from '@mui/material';


export function Portfolio() {
    const [events, setEvents] = useState<Event[]>([]);
    let navigate = useNavigate();

    let bought: number[] = [0.25, 0.50, 0.84];
    let current: number[] = [0.56, 0.43, 0.90];
    let tokens: number[] = [1, 5, 3]
    let positions: string[] = ["yes", "no", "yes"]

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
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", width:'100%',backgroundColor: '#1e1e1e'}}>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: '30px', width: '70%', marginBottom: "40px" }}>
            
                <Typography variant="h3" mb={2}>
                    Portfolio
                </Typography>

                {events.length ? <Stack spacing={1}>
                    {events.length > 0 && events.map((e, index) =>
                        <div key={e.name}>
                            <Card variant="outlined" style={{ padding: "5px", borderRadius: '10px' }}>
                                <CardContent>
                                    <Stack spacing={2} direction='row' style={{ marginRight: '20px', marginBottom: '20px', textAlign: 'center' }}>
                                        <img src={e.imageLink} style={{ objectFit: 'cover', width: '35px', height: '35px', borderRadius: '100%', marginRight: '10px' }}></img>
                                        <Typography variant="body2" fontSize="20px">
                                            {e.name}
                                        </Typography>
                                    </Stack>
                                    <Stack spacing={2} direction="row" style={{ float: 'right', marginBottom: "20px" }}>
                                        <Stack spacing={1} style={{ textAlign: "center" }}>
                                            <Typography variant="body2" style={{fontWeight: 600}}>
                                                Position
                                            </Typography>
                                            <Typography variant="body2">
                                                {positions[index % 3]}
                                            </Typography>
                                        </Stack>

                                        <Stack spacing={1} style={{ textAlign: "center" }}>
                                            <Typography variant="body2" style={{fontWeight: 600}}>
                                                Resolution Date
                                            </Typography>
                                            <Typography variant="body2">
                                                {e.resolutionDate}
                                            </Typography>
                                        </Stack>
                                        <div className='element'>
                                            <Stack spacing={1} style={{ textAlign: "center" }}>
                                                <Typography variant="body2" style={{fontWeight: 600}}>
                                                    Bought Price
                                                </Typography>
                                                <Typography variant="body2">
                                                    {bought[index % 3].toFixed(2)}
                                                </Typography>
                                            </Stack>
                                        </div>
                                        <div className='element'>
                                            <Stack spacing={1} style={{ textAlign: "center" }}>
                                                <Typography variant="body2" style={{fontWeight: 600}}>
                                                    Current Price
                                                </Typography>
                                                <Typography variant="body2">
                                                    {current[index % 3].toFixed(2)}
                                                </Typography>
                                            </Stack>
                                        </div>
                                        <div className='element'>
                                            <Stack spacing={1} style={{ textAlign: "center" }}>
                                                <Typography variant="body2" style={{fontWeight: 600}}>
                                                    Tokens Owned
                                                </Typography>
                                                <Typography variant="body2">
                                                    {tokens[index % 3]}
                                                </Typography>
                                            </Stack>
                                        </div>
                                        <div className='element'>
                                            <Stack spacing={1} style={{ textAlign: "center" }}>
                                                <Typography variant="body2" style={{fontWeight: 600}}>
                                                    Profit/Loss
                                                </Typography>
                                                <Typography variant="body2">

                                                    {
                                                        (tokens[index] * (current[index] - bought[index])) < 0 ?
                                                            <Typography variant="body2" style={{ color: "red" }}>
                                                                {(tokens[index % 3] * (current[index % 3] - bought[index % 3])).toFixed(2)}
                                                            </Typography> :
                                                            <Typography variant="body2" style={{ color: "green" }}>
                                                                {(tokens[index % 3] * (current[index % 3] - bought[index % 3])).toFixed(2)}
                                                            </Typography>
                                                    }


                                                </Typography>
                                            </Stack>

                                        </div>
                                        <Button onClick={() => navigate(`/event/${e.id!}`)} style={{ marginTop: '10px' }} variant="contained">TRADE</Button>

                                    </Stack>

                                </CardContent>
                            </Card>
                        </div>
                    )}
                </Stack> : <Typography style={{ marginTop: '80px' }} variant="h3" component="div">No Events</Typography>}
            
        </div>
        </div>

    );
}

function getRandomNum(): number {
    var min: number = Math.ceil(0);
    var max: number = Math.floor(100);
    return (Math.floor(Math.random() * (max - min + 1)) + min) / 100;
}
