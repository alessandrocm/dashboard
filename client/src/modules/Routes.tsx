import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './home/pages';
import { Workspaces } from 'modules/workspaces/pages';

export function Routes() {

  return (
    <Switch>
      <Route exact path="/">
        <Home title="Whiteboard" />
      </Route>
      <Route exact path="/workspaces">
        <Workspaces />
      </Route>
    </Switch>
  );

}
