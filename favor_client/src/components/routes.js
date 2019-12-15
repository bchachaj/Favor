import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Submissions from './pages/Submissions';
import Comments from './pages/Comments';

const routes = () => {
    return (
        <Switch>
            <Route path={'/comments'}><Comments /></Route>
            <Route path={'/submissions'}><Submissions /></Route>
            <Route path={'/'}><Dashboard /></Route>
        </Switch>
    )
}

export default routes; 