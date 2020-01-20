import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import BackToTop from './../shared/BackToTop';
import Navbar from '../shared/navbar/Navbar';


const useStyles = makeStyles(theme => ({
    root: {
        padding: "8px 4px 24px"
    },
}));


export default function ContentDisplayPage({ savedItems, subreddits }) {
    const classes = useStyles();

    return (
        <BackToTop>
            <Navbar link="/" linkLabel={"Back to Content Page"} />

            
        </BackToTop>
    )
}

