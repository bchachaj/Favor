import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
    root: {
        margin: '10px 30px',
    },
});

export default function ItemCard({ children }) {
    const classes = useStyles();
    return <Card className={classes.root}>{children}</Card>;
}