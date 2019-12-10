import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Submissions from './pages/Submissions';
import Comments from './pages/Comments';

const routes = () => {
    return (
        <Switch>
            <Route path={'/'}><Dashboard /></Route>
            <Route path={'/comments'}><Comments /></Route>
            <Route path={'/submissions'}><Submissions /></Route>
        </Switch>
    )
}

export default routes; 