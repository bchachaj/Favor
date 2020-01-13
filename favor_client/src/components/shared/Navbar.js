import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginLeft: theme.spacing(2),
    },
    navBar: {
        position: "fixed",
        left: 0,
        width: "100%",
        zIndex: 100
    },
    buffer: {
        minHeight: 64
    }
}));

export default function Navbar({ link, linkLabel }) {
    const classes = useStyles();

    return (
        <>
            <div className={classes.navBar}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Favor
                    </Typography>
                        <Link to={link}><Button className={classes.menuButton} variant="contained" color="inherit">{linkLabel}</Button></Link>
                    </Toolbar>
                </AppBar>

            </div >
            <div className={classes.buffer}>&nbsp;</div>
        </>
    )
}
