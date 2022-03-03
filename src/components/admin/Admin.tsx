import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { getAllEvents } from "../../solana/functions";
import { Event } from "../../solana/models";
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback } from "react";

export function Admin() {
    const [events, setEvents] = useState<Event[]>([]);
    let navigate = useNavigate();
    const { publicKey } = useWallet();

    const checkAdmin = useCallback(async () => {
        if (!publicKey) {
            // throw new WalletNotConnectedError();
            navigate('/events');
        }
        
        return fetch(`${process.env.REACT_APP_API_URL}/is-admin`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': publicKey!.toString(),
            }
        })
    }, [publicKey]);

    useEffect(() => {
        checkAdmin().then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(json => {
            if (!json || !json.result || !json.result.isAdmin) {
                // navigate('/events')
                // TODO NEED TO NAVIGATE AWAY IF NOT ADMIN
            }
        });

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
    }, [checkAdmin, publicKey])

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Grid container>
                {events.length > 0 && events.map(e =>
                    <Grid item lg={8} key={e.name}>
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
                                    {"resolves on " + e.resolution_date}
                                </Typography>

                                <div style={{ marginTop: '20px' }}>
                                    <Button variant="contained" style={{ marginRight: "10px" }}>Deny Event</Button>
                                    <Button variant="contained">Approve Event</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}
