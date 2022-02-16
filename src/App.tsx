// import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Header } from './components/Header';

export function App() {
   return (
      <div>
         <Header />
         <Link to='/events'>Events</Link>
         <Outlet />
      </div>
   );
}
