import React, { FC, ReactNode, useMemo } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ResponsiveAppBar from './components/navbar/Navbar';
import { Content, Context } from './components/wallet/Wallet';

export const App: FC = () => {
    return (
        <Context>
            <div id='app'>
                <div className='nav'>
                    <ResponsiveAppBar />
                </div>
                <Outlet />
            </div>
        </Context>
    );
};
