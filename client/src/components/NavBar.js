import React from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Login from './Login';

const NavBar = () => {
    return(
        <BrowserRouter>
        <div style={{ marginBottom: 30}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        TimeClock Admin Dashboard
                    </Typography>
                </Toolbar>

            </AppBar>
        </div>
        </BrowserRouter>
    )
}

export default NavBar;