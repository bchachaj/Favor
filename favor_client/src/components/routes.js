import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import ContentDisplayPage from './pages/ContentDisplayPage';
import jsonFromLocalFile from './../utils/readSavedFile';
import subredditSelector from './../utils/subredditSelector';
import SubAnalyticsPage from './pages/SubAnalyticsPage';

const Routes = () => {
    const [savedItems, setSavedItems] = useState([]);
    const [subs, setSubs] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await jsonFromLocalFile();
            setSavedItems(response);
            const subredditSelect = subredditSelector(response);
            setSubs(subredditSelect);
        }

        fetchData();
    }, [])

    return (
        <Switch>
            <Route path={'/analytics'}><SubAnalyticsPage savedItems={savedItems} subreddits={subs} /></Route>
            <Route path={'/'}><ContentDisplayPage savedItems={savedItems} subreddits={subs} /></Route>
        </Switch>
    )
};

export default Routes; 