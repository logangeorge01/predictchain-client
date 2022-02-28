// import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Navbar } from "./components/Navbar/Navbar";
import { Context, Content } from "./components/WalletConnection/WalletConnection"

export function App() {
   return (
      <div>
         <Header />
         <Context>
            <Navbar />
         </Context>
         
         <Outlet />
      </div>
   );
}
