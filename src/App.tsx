import React, { FC, ReactNode, useEffect, useMemo } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ResponsiveAppBar from './components/navbar/Navbar';
import { Content, Context } from './components/wallet/Wallet';
import { Paper, ThemeProvider, createTheme } from '@mui/material';

export const App: FC = () => {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    let navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/events');
        }
    }, [])
    
    return (
        <Context>
            <ThemeProvider theme={darkTheme}>
                <Paper style={{ height: "100vh", width: "100vw" }} square={true}>
                    <div id='app'>
                        <div className='nav' style={{ width: "100vw", marginTop: "0px" }}>
                            <div>
                                <ResponsiveAppBar />
                            </div>
                        </div>
                        <Outlet />
                    </div>
                </Paper>
            </ThemeProvider>
        </Context>
    );
};
