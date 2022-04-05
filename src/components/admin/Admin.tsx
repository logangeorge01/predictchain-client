import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getAllEvents } from "../../solana/functions";
import { Event } from "../../solana/models";
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { useWallet } from "@solana/wallet-adapter-react";

export function Admin() {
    const [events, setEvents] = useState<Event[]>([]);
    let navigate = useNavigate();
    const { publicKey } = useWallet();

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [adminChecked, setAdminChecked] = useState<boolean>(false);

    useEffect(() => {
        if (!publicKey) {
            return;
        }
        
        fetch(`${process.env.REACT_APP_API_URL}/is-admin`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': publicKey!.toString(),
            }
        }).then(res => {
            if (res?.ok) {
                return res.json();
            }
        }).then(json => {
            setAdminChecked(true);
            setIsAdmin(json && json.result);
        });
    }, [publicKey])

    useEffect(() => {
        if (!adminChecked || !publicKey) {
            return;
        }

        if (!isAdmin) {
            navigate('/events');
            return;
        }
            
        fetch(`${process.env.REACT_APP_API_URL}/pending-events`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': publicKey!.toString(),
            }
        }).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(json => {
            if (json && json.items) {
                setEvents(((json && json.items ? json.items : []) as any[]).map(event => {
                    return {
                        ...event,
                        resolution_date: new Date(parseInt(event.resolution_date)).toLocaleDateString()
                    } as Event
                }));
            }
        })
    }, [isAdmin])

    return isAdmin ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: '70%' }}>
            {events.length ? 
            <>
                <Typography style={{marginTop: '30px', marginBottom: '20px'}} variant="h3" component="div">Pending Events</Typography>
                <Grid container>
                    {events.length > 0 && events.map(e =>
                        <Grid item lg={4} key={e.name}>
                            <Card variant="outlined" style={{ margin: "20px", padding: "20px", borderRadius: '20px' }}>
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

                                    <div style={{ marginTop: '20px' }}>
                                        <Button variant="contained" style={{ marginRight: "10px" }}>Approve</Button>
                                        <Button variant="contained">Deny</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </> : <Typography style={{marginTop: '80px'}} variant="h3" component="div">No Pending Events</Typography>}
        </div>
    ) : (<div></div>);
}
