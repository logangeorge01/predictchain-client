import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { createEvent } from "../../solana/functions";
import { Event } from '../../solana/models';
import './NewEvent.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export function NewEventAlt() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [resolution_date, setResolutionDate] = React.useState<Date | null>(null);
    const [image_link, setImageLink] = useState('');


    let navigate = useNavigate();
    let date = new Date();
    if (resolution_date) {
        date = resolution_date;
    }

    async function onSubmit(e: any) {
        e.preventDefault();

        const newevent = new Event({
            name,
            description,
            resolution_date: date.getTime().toString(),
            category,
            image_link
        });
        console.log(newevent);


        const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/pending-events`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': 'TODO FIX THIS',
            },
            body: JSON.stringify({ event: newevent })
        });
        const content = await rawResponse.json();

        navigate('/events');
    };

    function onCancel() {
        navigate('/events');
    }

    return (
        <div className='newevent'>
            <div>Request a New Event</div><br />
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >

                <div className='input'>
                    <TextField
                        required
                        id="outlined-name"
                        label="Name"
                        value={name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setName(event.target.value)
                        }}
                    />
                </div>
                <div className='input'>
                    <TextField
                        required
                        id="outlined-name"
                        label="Description"
                        value={description}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setDescription(event.target.value)
                        }}
                    />
                </div>
                <div className='input'>
                    <TextField
                        required
                        id="outlined-name"
                        label="Category"
                        value={category}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setCategory(event.target.value)
                        }}
                    />
                </div>

                <div className='input'>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            disablePast
                            label="Enter Date"
                            value={resolution_date}
                            onChange={(newValue) => {
                                setResolutionDate(newValue);
                                if (newValue) {
                                    console.log(newValue.getTime().toString())
                                }
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div className='input'>
                    <TextField
                        id="outlined-name"
                        label="Image"
                        value={image_link}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setImageLink(event.target.value)
                        }}
                    />
                </div>
                <div className='input'>
                <Stack spacing={1} direction="row">
                    <Button  className='formbutton' variant='contained' onClick={onCancel}>Cancel</Button>
                    <Button className='formbutton' variant='contained' onClick={onSubmit}>Create Event</Button>
                </Stack></div>
            </Box>

        </div>
    );
}