import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { getAllEvents } from "../../solana/functions";
import { Event } from "../../solana/models";
import { Button, Card, CardContent, Typography, Grid, TextField, Paper } from '@mui/material';

export function EventDetail() {
    const [event, setEvent] = useState<Event>();
    const { eventid } = useParams();
    const [selectedOutcome, setSelectedOutcome] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const yesPrice = .62;
    const noPrice = .38;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/events/${eventid}`).then(res => {
            if (res.ok) {
                return res.json()
            }
        }).then(event => {
            if (event) {
                setEvent({
                    ...event,
                    resolutionDate: new Date(parseInt(event.resolutionDate)).toLocaleDateString()
                } as Event);
            }
        });
    }, [])

    function handleOutcomeSelection(text: string) {
        setSelectedOutcome(selectedOutcome === text ? '' : text);
    }

    function getVariant(text: string) {
        return selectedOutcome === text ? 'contained' : 'outlined';
    }

    function handleChange(event: any) {
        setAmount(event.target.value);
    }

    function purchaseShares() {
        console.log(selectedOutcome);
        console.log(amount);
        console.log((amount / (selectedOutcome === 'yes' ? yesPrice : noPrice)).toFixed(3));
    }

    return event ? (
        <Paper style={{display: "flex", flexDirection: "column", alignItems: "center", width:'100%'}}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: '30px', width: '70%' }}>
            <Card variant="outlined" style={{ margin: "40px", padding: "60px", borderRadius: '20px' }}>
                <CardContent>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <img src={event.imageLink} style={{objectFit: 'cover', width: '55px', height: '55px', borderRadius: '100%', marginRight: '10px'}}></img>
                        <Typography variant="h4" component="div">
                            {event.name}
                        </Typography>
                    </div>
                    <Typography variant="h6" sx={{ mt: 2, mb: 1.5 }} color="text.secondary">
                        {event.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: .5, mt: 1 }} color="text.secondary">
                        {event.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {"Resolves on " + event.resolutionDate}
                    </Typography>

                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '60px', width: '100%', justifyContent: 'center'}}>
                        <Typography variant="body1" style={{marginRight: '60px'}}>
                            {'Volume: 23.48 SOL'}
                        </Typography>
                        <Typography variant="body1" color="text.primary">
                            {'Liquidity: 2.15 SOL'}
                        </Typography>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row', marginTop: '40px', width: '100%', justifyContent: 'center'}}>
                        <Button onClick={() => handleOutcomeSelection('yes')} variant={getVariant('yes')} color="secondary" style={{ marginRight: '30px', width: '200px', height: '100px', fontWeight: 'bold', borderWidth: '4px' }} size="large">
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{fontSize: '20px', lineHeight: 1, marginBottom: '8px'}}>YES</div>
                                <div style={{fontSize: '30px', lineHeight: 1}}>{yesPrice}◎</div>
                            </div>
                        </Button>
                        <Button onClick={() => handleOutcomeSelection('no')} variant={getVariant('no')} color="secondary" style={{ width: '200px', height: '100px', fontWeight: 'bold', borderWidth: '4px' }} size="large">
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <div style={{fontSize: '20px', lineHeight: 1, marginBottom: '8px'}}>NO</div>
                                <div style={{fontSize: '30px', lineHeight: 1}}>{noPrice}◎</div>
                            </div>
                        </Button>
                    </div>

                    <div style={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: '30px', alignItems: 'center'}}>
                        <TextField label='Amount in SOL' onChange={handleChange} variant='outlined' color="secondary" style={{borderWidth: '4px', width: '250px'}}/>

                        <div hidden={!amount} style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                            <Typography variant="body1" color="text.primary">
                                {`Shares purchased: ${(amount / (selectedOutcome === 'yes' ? yesPrice : noPrice)).toFixed(3)}`}
                            </Typography>
                            <Typography variant="body1" color="text.primary">
                                {`Potential earnings: ${(amount / (selectedOutcome === 'yes' ? yesPrice : noPrice)).toFixed(3)}◎`}
                            </Typography>
                        </div>
                    </div>

                    <div style={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: '30px'}}>
                        <Button disabled={!selectedOutcome || !amount} onClick={purchaseShares} variant="contained" color="secondary" style={{width: '400px', height: '50px', borderRadius: '8px'}}>
                            <div style={{fontWeight: 'bold', fontSize: '20px'}}>
                                Buy Shares
                            </div>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
        </Paper>
    ) : <div></div>;
}
