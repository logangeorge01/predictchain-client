// import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Navbar } from "./components/Navbar/Navbar";

export function App() {
   return (
      <div>
         <Header />
         <Navbar />
         <Outlet />
      </div>
   );
}
