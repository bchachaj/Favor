import React, { useEffect, useState } from 'react'
import Navbar from './../shared/Navbar';
import ItemIndex from './../shared/ItemIndex';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
        chipCount: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }
    },
}));

export default function SubredditsDisplayPage({ savedItems, subreddits }) {
    const classes = useStyles();
    const [filters, setFilters] = useState([]);
    const [initState, setInitState] = useState([]);

    useEffect(() => {
        setInitState(savedItems);
    }, [savedItems]);

    const presort = Object.keys(subreddits).sort((x, y) => {
        const countX = subreddits[x].length;
        const countY = subreddits[y].length;
        return countY - countX;
    });

    const subChips = presort.map((sub, idx) => {
        const linkArr = subreddits[sub];
        return (<Chip clickable
            label={sub}
            key={idx}
            color="primary"
            count={linkArr.length}
            onClick={() => toggleChipFilter(sub)}
            avatar={<Avatar>{linkArr.length}</Avatar>} />);
    });

    const toggleChipFilter = (sub) => {
        if (filters.includes(sub)) {
            const updatedArr = filters.filter((el) => el != sub);
            setFilters(updatedArr);
        } else {
            setFilters(filters => [...filters, sub]);

        }
    };

    const filteredState = () => {
        if (filters.length === 0) return initState;
        return initState.filter((sub) => {
            return filters.includes(sub.subreddit.display_name)
        });
    }

    return (
        <>
            <Navbar link="/dashboard" linkLabel={"Home"} />

            <div className={classes.root} id="sub-display-container">
                {subChips}
            </div>

            <ItemIndex items={filteredState()} />
        </>
    )
}
