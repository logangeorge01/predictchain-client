import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from "../../solana/functions";
import { SolEvent } from '../../solana/models';

export function NewEventComponent() {
   const [description, setDescription] = useState('');
   const [league, setLeague] = useState('');
   const [starttimedate, setStarttimeDate] = useState('');
   const [starttimetime, setStarttimeTime] = useState('');
   const [image0, setImage0] = useState('');
   const [image1, setImage1] = useState('');
   const [side0, setSide0] = useState('');
   const [side1, setSide1] = useState('');

   let navigate = useNavigate();

   async function onSubmit(e: any) {
      e.preventDefault();

      const newevent = new SolEvent({
         description,
         starttime: new Date(`${starttimedate} ${starttimetime}`).getTime(),
         league,
         image0: image0,
         image1: image1,
         side0,
         side1
      });

      // submit event to server function
      // await createEvent(newevent); //real create event smart contract
      navigate('/events');
   };

   return (
      <div>
         <div><input type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)} /></div><br />
         <div><input type="text" placeholder="league" onChange={(e) => setLeague(e.target.value)} /></div><br />
         <div>
            <input type="date" onChange={(e) => setStarttimeDate(e.target.value)} />
            <input type="time" onChange={(e) => setStarttimeTime(e.target.value)} />
         </div><br />
         {/* <div>optional</div> */}
         <div>
            <input type="text" placeholder="image0" onChange={(e) => setImage0(e.target.value)} />
            <input type="text" placeholder="image1" onChange={(e) => setImage1(e.target.value)} />
         </div><br />

         <div>
            <input type="text" placeholder="side0" onChange={(e) => setSide0(e.target.value)} />
            <input type="text" placeholder="side1" onChange={(e) => setSide1(e.target.value)} />
         </div><br />

         <button onClick={onSubmit}>Create Event</button>
      </div>
   );
}
