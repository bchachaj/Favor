import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactHTMLParser from 'react-html-parser';
import ItemCard from './ItemCard';

const useStyles = makeStyles({
    title: {
        fontSize: 14,
    }
});

const Comment = React.memo(({ item }) => {
    const classes = useStyles();

    return (
        <ItemCard>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Comment - {item.subreddit.display_name} - {item.link_title}
                </Typography>

                {ReactHTMLParser(item.body_html)}
            </CardContent>

            <CardActions>
                <Button size="small" variant="contained" color="default" target="_blank" href={item.link_permalink}>Visit thread</Button>
            </CardActions>
        </ItemCard>
    )
});


export default Comment;