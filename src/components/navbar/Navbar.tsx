import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { Content } from '../wallet/Wallet';
import './Navbar.css'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { FC } from 'react';
import { useCallback } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useEffect } from 'react';

const ResponsiveAppBar= () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { publicKey } = useWallet();

    const [pages, setPages] = useState(['events', 'portfolio']);

    useEffect(() => {
        if (!publicKey) {
            return;
        }
        
        fetch(`${process.env.REACT_APP_API_URL}/is-admin`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': publicKey!.toString(),
            }
        }).then(res => {
            if (res?.ok) {
                return res.json();
            }
        }).then(json => {
            if (json && json.result) {
                setPages(['events', 'portfolio', 'admin']);
            }
        });
     }, [publicKey])

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ mr: 4, display: { xs: 'none', md: 'flex' } }}
                    >
                        PredictChain
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map(page => {
                                (<MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link style={{ textDecoration: "none", color: "white" }} to={`/${page}`}>
                                            {page}
                                        </Link>
                                    </Typography>
                                </MenuItem>)
                            })}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        PREDICTCHAIN
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link style={{ textDecoration: "none", color: "white" }} to={`/${page}`}>
                                    {page}
                                </Link>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, mr: 2 }}>
                        <GetBalance />
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Content />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;



const GetBalance: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [amount, setAmount] = useState('0');

    const checkBalance = useCallback(async () => {
        if (!publicKey) {
            return;
        }

        const walletBalance = await connection.getBalance(publicKey, 'confirmed');
        const walletBalanceSOL = (walletBalance / LAMPORTS_PER_SOL).toFixed(2);
        setAmount(walletBalanceSOL);
    }, [connection, publicKey]);

    useEffect(() => {
        checkBalance();
    }, [publicKey]);

    return (
        <Button onClick={checkBalance} variant="text"><p>{amount} SOL</p></Button>
    );
};

