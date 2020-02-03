import React, { useState, useEffect } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';
import TypeFilterControl from '../TypeFilterControl';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import BackToTop from './../shared/BackToTop';
import Loader from './../shared/Loader';
import Navbar from '../shared/navbar/Navbar';
import ItemIndex from '../content/ItemIndex';
import SubChipIndex from '../SubChipIndex';
import ExpandControl from './../ExpandControl';
import useChipFilter from '../../hooks/useChipFilter';

const useStyles = makeStyles(theme => ({
    root: {
        padding: "8px 4px 24px"
    },
}));

const ExpansionPanelSummary = withStyles({
    content: {
        '& > *': {
            marginRight: '12px',
        },
    },
})(MuiExpansionPanelSummary);

export default function ContentDisplayPage({ savedItems, subreddits, isLoaded }) {
    const classes = useStyles();
    const { activeFilters, toggleChipFilter, chipFilteredState } = useChipFilter(savedItems);
    const [showComments, setShowComments] = useState(true);
    const [showSubs, setShowSubs] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [loadState, setLoadState] = useState(isLoaded);

    useEffect(() => {
        setLoadState(isLoaded);
    }, [isLoaded])

    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });;

    const toggleComments = () => {
        setShowComments(prev => !prev);
    };
    const toggleSubs = () => {
        setShowSubs(prev => !prev);
    };

    const filteredState = () => {
        const filteredBySub = chipFilteredState();
        const filteredStateByType = filteredBySub.filter((item) => {
            const filterByComment = item.hasOwnProperty('body') && showComments;
            const filterBySub = !item.hasOwnProperty('body') && showSubs;

            if (filterByComment) return item;
            if (filterBySub) return item;
        });

        return filteredStateByType;
    };

    const sortedSubChipLabels = (subreddits) => {
        return Object.keys(subreddits).sort((x, y) => {
            const countX = subreddits[x].length;
            const countY = subreddits[y].length;
            return countY - countX;
        });
    };

    const renderContentIfLoaded = (subs, type) => {
        const haveItemsAvailable = Object.keys(subs).length > 0;
        if (haveItemsAvailable) {
          if (type === "itemIndex") {
            return <ItemIndex items={filteredState()} expanded={expanded} />;
          } else if (type === "subIndex") {
            return (
              <SubChipIndex
                chipArr={sortedSubChipLabels(subs)}
                subreddits={subs}
                toggleChipFilter={toggleChipFilter}
                activeFilters={activeFilters}
              />
            );
          }
        } else {
          return "No data to display";
        }
    };

    return (
      <BackToTop>
        <Navbar link="/analytics" linkLabel={"Visit Analytics Page"} />
        <ExpansionPanel defaultExpanded={!isMobileView && subreddits.length > 80}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <SettingsIcon />
            <Typography>Filters</Typography>
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelDetails className={classes.root}>
            {loadState ? renderContentIfLoaded(subreddits, 'subIndex') : <Loader />}
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <TypeFilterControl
              toggleComments={toggleComments}
              toggleSubs={toggleSubs}
              showComments={showComments}
              showSubs={showSubs}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpandControl expanded={expanded} setExpanded={setExpanded} />
        {loadState ? renderContentIfLoaded(subreddits, 'itemIndex') : <Loader />}
      </BackToTop>
    );
}

