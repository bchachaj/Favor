import React, { useState, useEffect } from 'react'
import Input from '@material-ui/core/Input';
import Search from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from '@material-ui/core/styles';

import SubChip from './SubChip';


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

export default function SubChipIndex({ chipArr, subreddits, toggleChipFilter, activeFilters }) {
    const classes = useStyles();
    const [subChips, setSubChips] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");

    useEffect(() => {
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
        setSubChips(filteredBySearch(chipArr, searchFilter));;

    }, [chipArr, searchFilter])

    const renderChips = (subchips) => {
        return subchips.map((sub, idx) => {
          const linkArrLen = subreddits[sub].length;
          const isActive = activeFilters.includes(sub);
          return (
            <SubChip
              clickable
              sub={sub}
              key={idx}
              isActive={isActive}
              linkArrLen={linkArrLen}
              toggleChipFilter={toggleChipFilter}
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
