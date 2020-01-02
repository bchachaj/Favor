import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import SubredditsDisplayPage from './pages/SubredditsDisplayPage';

const routes = () => {
    return (
        <Switch>
            <Route path={'/subreddits'}><SubredditsDisplayPage /></Route>
            <Route path={'/'}><Dashboard /></Route>
        </Switch>
    )
}

export default routes; 