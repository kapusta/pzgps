import { h, render } from 'preact';
import App from './components/App/App.jsx';
import './style';
let root;

function init() {
  //let App = require('./components/App/App.jsx').default;
  root = render(
    <App/> ,
    document.querySelector("#app"),
    root
  );
}

init();

if (module.hot) {
  module.hot.accept('./components/App/App.jsx', () => requestAnimationFrame(() => {
    flushLogs();
    init();
  }));
  // optional: mute HMR/WDS logs
  let log = console.log,
    logs = [];
  console.log = (t, ...args) => {
    if (typeof t === 'string' && t.match(/^\[(HMR|WDS)\]/)) {
      if (t.match(/(up to date|err)/i)) logs.push(t.replace(/^.*?\]\s*/m, ''), ...args);
    } else {
      log.call(console, t, ...args);
    }
  };
  let flushLogs = () => console.log(`%c🚀 ${logs.splice(0,logs.length).join(' ')}`, 'color:#888;');
}
