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
import { useWallet } from '@solana/wallet-adapter-react';
import { Typography } from '@mui/material';

export function NewEvent() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [resolutionDate, setResolutionDate] = React.useState<Date | null>(null);
    const [imageLink, setImageLink] = useState('');

    const { publicKey } = useWallet();

    let navigate = useNavigate();
    let date = new Date();
    if (resolutionDate) {
        date = resolutionDate;
    }

    function onSubmit() {
        if (!name || !description || !resolutionDate || !category) {
            alert('Must provide all required fields');
            return;
        }

        const newevent = new Event({
            name,
            description,
            resolutionDate: date.getTime().toString(),
            category,
            imageLink: imageLink || 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Square_gray.svg/200px-Square_gray.svg.png'
        });

        fetch(`${process.env.REACT_APP_API_URL}/pending-events`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': publicKey?.toString() ?? '',
            },
            body: JSON.stringify({ event: newevent })
        }).then(() => {
            alert('Event request submitted successfully!');
            navigate('/events');
        });
    };

    function onCancel() {
        navigate('/events');
    }

    return (
        <div className='newevent'>
            <Typography style={{marginTop: '30px', marginBottom: '20px'}} variant="h4" component="div">Request a New Event</Typography>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 2, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
            >

                <div className='input'>
                    <TextField
                        required
                        id="outlined-name"
                        label="Title"
                        value={name}
                        style={{width:'100%'}}
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
                        style={{width:'100%'}}
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
                        style={{width:'100%'}}
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
                            value={resolutionDate}
                            onChange={(newValue) => {
                                setResolutionDate(newValue);
                                // if (newValue) {
                                //     console.log(newValue.getTime().toString())
                                // }
                            }}
                            renderInput={(params) => <TextField {...params} style={{width:'100%'}} required/>}
                        />
                    </LocalizationProvider>
                </div>
                <div className='input'>
                    <TextField
                        id="outlined-name"
                        label="Image Link"
                        value={imageLink}
                        style={{width:'100%'}}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setImageLink(event.target.value)
                        }}
                    />
                </div>
                <div className='input'>
                    <Stack spacing={1} direction="row" style={{float:'right'}}>
                        <Button  className='formbutton' variant='contained' onClick={onCancel}>Cancel</Button>
                        <Button className='formbutton' variant='contained' onClick={onSubmit}>Submit</Button>
                    </Stack>
                </div>
            </Box>

        </div>
    );
}