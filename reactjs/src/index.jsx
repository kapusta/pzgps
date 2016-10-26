import React from 'react';
import { render } from 'react-dom';
import App from './app/app.jsx';
import About from './about/about.jsx';
import Navbar from './navbar/navbar.jsx';

render(
  <App>
    <Navbar/>
    <div id="contentGoesHere">
      <About/>
    </div>
  </App>,
  document.querySelector("#app")
);
