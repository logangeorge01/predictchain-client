import React, { FC, ReactNode, useMemo } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ResponsiveAppBar from './components/navbar/Navbar';
import { Content, Context } from './components/wallet/Wallet';

export const App: FC = () => {
   return (
      <div id='app'>
         <div className='nav'>
            <Context>
               <ResponsiveAppBar />
            </Context>
         </div>
         <Outlet />
      </div>
   );
};
