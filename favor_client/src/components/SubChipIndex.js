import React from 'react'
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: theme.spacing(1),
        '& > *': {
            margin: theme.spacing(0.5),
        },
        chipCount: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        chipIndexWrapper: {
            flexDirection: 'column',
            alignContent: 'center',
        },
        chipSearch: {
            padding: '0 24px 0 24px !important',
            marginBottom: theme.spacing(1),
        },
        searchInput: {
            minWidth: '300px'
        }
    },
}));

export default function SubChipIndex({ subreddits, toggleChipFilter, filters }) {
    const classes = useStyles();

    const presort = Object.keys(subreddits).sort((x, y) => {
        const countX = subreddits[x].length;
        const countY = subreddits[y].length;
        return countY - countX;
    });

    const subChips = presort.map((sub, idx) => {
        const linkArr = subreddits[sub];
        const isActive = filters.includes(sub);
        return (<Chip clickable
            label={sub}
            key={idx}
            size="medium"
            color={isActive ? "secondary" : "primary"}
            count={linkArr.length}
            onClick={() => toggleChipFilter(sub)}
            avatar={<Avatar>{linkArr.length}</Avatar>} />);
    });

    return (
        <div className={classes.chipIndexWrapper}>
            <div className={classes.root}>
                {/* <form className={classes.root} noValidate autoComplete="off">
                    <Input placeholder="Click to search tags" inputProps={{ 'aria-label': 'subreddit search' }} />
                </form> */}
            </div>
            
            <div className={classes.root} id="sub-display-container">
                {subChips}
            </div>
        </div>
    )
}
