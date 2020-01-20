import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
    root: {
        margin: '10px 0px 20px 0px',
    },
});

const ItemCard = React.forwardRef((props, ref) => {
    const classes = useStyles();
    return <Card className={classes.root} ref={ref}>{props.children}</Card>;
});

export default ItemCard;    