import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { createEvent } from "../../solana/functions";
import { Event } from '../../solana/models';
import './NewEvent.css';

export function NewEvent() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [resolution_date, setResolutionDate] = useState('');
    const [image_link, setImageLink] = useState('');

    let navigate = useNavigate();

    async function onSubmit(e: any) {
        e.preventDefault();

        const newevent = new Event({
            name,
            description,
            resolution_date: new Date(resolution_date.replaceAll('-', '/')).getTime().toString(),
            category,
            image_link
        });


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


        // if (!response.ok) { /* Handle */ }

        // // If you care about a response:
        // if (response.body !== null) {
        //    // body is ReadableStream<Uint8Array>
        //    // parse as needed, e.g. reading directly, or
        //    const asString = new TextDecoder("utf-8").decode(response.body);
        //    // and further:
        //    const asJSON = JSON.parse(asString);  // implicitly 'any', make sure to verify type on runtime.
        // }


        // submit event to server function
        // await createEvent(newevent); //real create event smart contract




        navigate('/events');
    };

    function onCancel() {
        navigate('/events');
    }

    return (
        <div className='newevent'>
            <br />
            <div>Request a New Event</div><br />

            <div><input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} /></div><br />
            <div><input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)} /></div><br />
            <div><input type="text" placeholder="category" onChange={(e) => setCategory(e.target.value)} /></div><br />

            <div><input type="date" onChange={(e) => setResolutionDate(e.target.value)} /></div><br />

            <div>
                <input type="text" placeholder="image" onChange={(e) => setImageLink(e.target.value)} />
            </div><br />

            <div>
                <button className='formbutton' onClick={onCancel}>Cancel</button>
                <button className='formbutton' onClick={onSubmit}>Create Event</button>
            </div>
        </div>
    );
}
