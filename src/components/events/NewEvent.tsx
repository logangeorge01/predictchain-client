import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { createEvent } from "../../solana/functions";
import { SolEvent } from '../../solana/models';
import './NewEvent.css';

export function NewEvent() {
   const [description, setDescription] = useState('');
   const [category, setCategory] = useState('');
   const [resolveDate, setResolveDate] = useState('');
   const [image, setImage] = useState('');

   let navigate = useNavigate();

   async function onSubmit(e: any) {
      e.preventDefault();

      const newevent = new SolEvent({
         description,
         resolvedate: new Date(resolveDate).getTime(),
         category,
         image
      });

      // submit event to server function
      // await createEvent(newevent); //real create event smart contract
      navigate('/events');
   };

   function onCancel() {
      navigate('/');
   }

   return (
      <div className='newevent'>
         <br />
         <div>Request a New Event</div><br />

         <div><input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)} /></div><br />
         <div><input type="text" placeholder="category" onChange={(e) => setCategory(e.target.value)} /></div><br />

         <div><input type="date" onChange={(e) => setResolveDate(e.target.value)} /></div><br />

         <div>
            <input type="text" placeholder="image" onChange={(e) => setImage(e.target.value)} />
         </div><br />

         <div>
            <button className='formbutton' onClick={onCancel}>Cancel</button>
            <button className='formbutton' onClick={onSubmit}>Create Event</button>
         </div>
      </div>
   );
}
