import React from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ThemeToggle from './ThemeToggle';

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
    title: {
        flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
}));

export default function Navbar({ link, linkLabel }) {
    const classes = useStyles();

    return (
        <>
            <div className={classes.navBar}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Favor
                         </Typography>
                        <Button color="inherit">Login</Button>
                        <ThemeToggle />
                    </Toolbar>

                </AppBar>

            </div>
            <div className={classes.toolbar}></div>
        </>
    )
}
