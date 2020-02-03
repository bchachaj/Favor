import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ContentDisplayPage from './pages/ContentDisplayPage';
import SubAnalyticsPage from './pages/SubAnalyticsPage';

import useLocalData from './../hooks/useLocalData';

const Routes = () => {
    const { subs, savedItems, isLoaded } = useLocalData();

    return (
      <>
        <Switch>
          <Route path={"/analytics"}>
            <SubAnalyticsPage savedItems={savedItems} subreddits={subs} />
          </Route>
          <Route path={"/"}>
            <ContentDisplayPage
              savedItems={savedItems}
              subreddits={subs}
              isLoaded={isLoaded}
            />
          </Route>
        </Switch>
        <span className="site-credit" style={{ position: 'fixed', left: '10px ' }}>
          Built by <a href={"https://github.com/bchachaj"}>Ben</a>
        </span>
      </>
    );
};

export default Routes; 