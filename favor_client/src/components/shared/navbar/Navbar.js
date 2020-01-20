import React, { useMemo } from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ThemeToggle from './ThemeToggle';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginLeft: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
    },
    navBar: {
        position: "fixed",
        left: 0,
        width: "100%",
        zIndex: 100
    },
    grow: {
        flexGrow: 1
    },
    toolbar: theme.mixins.toolbar,
}));

export default function Navbar({ link, linkLabel }) {
    const classes = useStyles();

    const renderLink = React.useMemo(
        () =>
            React.forwardRef((linkProps, ref) => (
                <Link ref={ref} to={link} {...linkProps} />
            )),
        [],
    );

    return (
        <>
            <div className={classes.navBar}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.grow} variant="h6" noWrap>
                            Favor
                         </Typography>
                        <ThemeToggle className={classes.menuButton}/>
                        <Button variant="outlined" className={classes.menuButton} component={renderLink}>{linkLabel}</Button>
                    </Toolbar>

                
                </AppBar>
            </div>
            <div className={classes.toolbar} id="back-to-top-anchor"></div>
        </>
    )
}
