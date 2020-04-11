import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from './components';
import { Workspaces } from 'modules/workspaces/components';

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
