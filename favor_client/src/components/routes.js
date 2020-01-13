import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import SubredditsDisplayPage from './pages/SubredditsDisplayPage';
import jsonFromLocalFile from './../utils/readSavedFile';

const Routes = () => {
    const [savedItems, setSavedItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await jsonFromLocalFile();
            setSavedItems(response);
        }
        fetchData();

    }, [])

    return (
        <Switch>
            <Route path={'/subreddits'}><SubredditsDisplayPage savedItems={savedItems} /></Route>
            <Route path={'/'}><Dashboard savedItems={savedItems} /></Route>
        </Switch>
    )
}

export default Routes; 