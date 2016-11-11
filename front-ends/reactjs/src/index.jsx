import React from 'react';
import { render } from 'react-dom';
import App from './app/app.jsx';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={App} />
    </Route>
  </Router>,
  document.querySelector("#app")
);