import React, { useState } from 'react'
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

export default function ContentDisplayPage({ savedItems, subreddits }) {
    const classes = useStyles();
    const { activeFilters, toggleChipFilter, chipFilteredState } = useChipFilter(savedItems);
    const [showComments, setShowComments] = useState(true);
    const [showSubs, setShowSubs] = useState(true);
    const [expanded, setExpanded] = useState(false);

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

        const filteredByType = filteredBySub.filter((item) => {
            const filterByComment = item.hasOwnProperty('body') && showComments;
            const filterBySub = !item.hasOwnProperty('body') && showSubs;

            if (filterByComment) return item;
            if (filterBySub) return item;
        });

        return filteredByType;
    };

    return (
        <BackToTop>
            <Navbar link="/analytics" linkLabel={"Visit Analytics Page"} />

            <ExpansionPanel defaultExpanded={!isMobileView}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <SettingsIcon />
                    <Typography>Filters</Typography>

                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails className={classes.root}>

                    <SubChipIndex subreddits={subreddits}
                        toggleChipFilter={toggleChipFilter}
                        activeFilters={activeFilters} />

                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <TypeFilterControl toggleComments={toggleComments}
                        toggleSubs={toggleSubs}
                        showComments={showComments}
                        showSubs={showSubs} />
                </ExpansionPanelDetails>

            </ExpansionPanel>
            <ExpandControl expanded={expanded} setExpanded={setExpanded} />
            <ItemIndex items={filteredState()} expanded={expanded}/>
        </BackToTop>
    )
}

