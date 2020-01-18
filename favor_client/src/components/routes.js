import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import SubredditsDisplayPage from './pages/SubredditsDisplayPage';
import jsonFromLocalFile from './../utils/readSavedFile';
import subredditSelector from './../utils/subredditSelector';

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

    console.log('render')

    return (
        <Switch>
            <Route path={'/subreddits'}><SubredditsDisplayPage savedItems={savedItems} subreddits={subs} /></Route>
            <Route path={'/'}><Dashboard savedItems={savedItems} /></Route>
        </Switch>
    )
};

export default Routes; 