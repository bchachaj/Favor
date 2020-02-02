import React, { useState, useEffect } from 'react'
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import Search from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    flexGrow: 1,
    marginTop: theme.spacing(1),
    "& > *": {
      margin: theme.spacing(0.5)
    },
    chipCount: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    chipSearch: {
      padding: "0 24px 0 24px !important",
      marginBottom: theme.spacing(1)
    },
    searchInput: {
      minWidth: "300px"
    }
  },
  chipIndexWrapper: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    flexGrow: 1
  }
}));

export default function SubChipIndex({ subreddits, toggleChipFilter, activeFilters }) {
    const classes = useStyles();
    const [subChips, setSubChips] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");

    useEffect(() => {
        const presort = Object.keys(subreddits).sort((x, y) => {
            const countX = subreddits[x].length;
            const countY = subreddits[y].length;
            return countY - countX;
        });

        const filteredBySearch = (input,  search) => {
            if(!search.length) {
                return input; 
            } else {
                const searchRes = input.filter(el =>
                  el.toLowerCase().includes(search.toLowerCase())
                );
                return searchRes;
            }
        };
        
        setSubChips(filteredBySearch(presort, searchFilter));;

    }, [subreddits, toggleChipFilter, searchFilter])


    const renderChips = (subchips) => {
        return subchips.map((sub, idx) => {
          const linkArrLen = subreddits[sub].length;
          const isActive = activeFilters.includes(sub);
          return (
            <Chip
              clickable
              label={sub}
              key={idx}
              size="medium"
              color={isActive ? "secondary" : "primary"}
              count={linkArrLen}
              onClick={() => toggleChipFilter(sub)}
              avatar={<Avatar>{linkArrLen}</Avatar>}
            />
          );
        });
    }

    const indexOutput = () => {
        if (!subChips.length && searchFilter.length) {
                  return `No items matched "${searchFilter}"`; 
        } else {
            return renderChips(subChips);
        }
    }

    return (
      <div className={classes.chipIndexWrapper}>
        <div className={classes.root}>
          <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder="Click to search tags"
              inputProps={{ "aria-label": "subreddit search" }}
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
              autoFocus
              onChange={(e) => {
                   setSearchFilter(e.target.value)
              }}
            />
          </form>
        </div>

        <div className={classes.root} id="sub-display-container">
          {indexOutput()}
        </div>
      </div>
    );
}
