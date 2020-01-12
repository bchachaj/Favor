import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ItemCard from './ItemCard';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Comment({ item }) {
    const classes = useStyles();

    return (
        <ItemCard>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Comment
             </Typography>

                <Typography variant="body1" component="p">
                    {item.body}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small" variant="contained" color="primary" target="_blank" href={item.link_permalink}>Visit thread</Button>
            </CardActions>
        </ItemCard>
    )
}
