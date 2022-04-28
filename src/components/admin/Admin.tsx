import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getAllEvents } from "../../solana/functions";
import { Event } from "../../solana/models";
import { Button, Card, CardContent, Typography, Grid, Paper } from '@mui/material';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createEvent } from "../../solana/functions";

export function Admin() {
    const [events, setEvents] = useState<Event[]>([]);
    let navigate = useNavigate();

    const wallet = useWallet();
    const { connection } = useConnection();

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [adminChecked, setAdminChecked] = useState<boolean>(false);

    useEffect(() => {
        if (!wallet.publicKey) {
            return;
        }
        
        fetch(`${process.env.REACT_APP_API_URL}/is-admin`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': wallet.publicKey!.toString(),
            }
        }).then(res => {
            if (res?.ok) {
                return res.json();
            }
        }).then(json => {
            setAdminChecked(true);
            setIsAdmin(json && json.result);
        });
    }, [wallet.publicKey])

    useEffect(() => {
        if (!adminChecked || !wallet.publicKey) {
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
                'x-api-key': wallet.publicKey!.toString(),
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
                        resolutionDate: new Date(parseInt(event.resolutionDate)).toLocaleDateString()
                    } as Event
                }));
            }
        })
    }, [isAdmin])

    async function approveEvent(eventid: string) {
        //solana stuff
        const eventPublicKey = await createEvent(connection, wallet);
        fetch(`${process.env.REACT_APP_API_URL}/approve-event/${eventid}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': wallet.publicKey!.toString(),
            },
            body: JSON.stringify({ eventPublicKey })
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(json => {
            setEvents(events.filter(e => e.id != json.event.id));
        });
    };

    function denyEvent(eventid: string) {
        fetch(`${process.env.REACT_APP_API_URL}/events/${eventid}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': wallet.publicKey!.toString(),
            }
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            }
        }).then(json => {
            setEvents(events.filter(e => e.id != json.event.id));
        });
    };

    return isAdmin ? (
        <Paper style={{display: "flex", flexDirection: "column", alignItems: "center", width:'100%'}}>
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
                                        <img src={e.imageLink} style={{objectFit: 'cover', width: '35px', height: '35px', borderRadius: '100%', marginRight: '10px'}}></img>
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
                                        {"Resolves on " + e.resolutionDate}
                                    </Typography>

                                    <div style={{ marginTop: '20px' }}>
                                        <Button variant="contained" onClick={() => approveEvent(e.id!)} style={{ margin: '5px' }}>Approve</Button>
                                        <Button variant="contained" onClick={() => denyEvent(e.id!)} style={{ margin: '5px' }}>Deny</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </> : <Typography style={{marginTop: '80px'}} variant="h3" component="div">No Pending Events</Typography>}
        </div>
        </Paper>
    ) : (<div></div>);
}
