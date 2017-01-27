import { h, render } from 'preact';
import App from './components/App/App.jsx';
import 'react-select/dist/react-select.css';
import './style';
let root;

function init() {
  console.log('initializing app');
  root = render(
    <App/>,
    document.querySelector("#app"),
    root
  );
}

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV==='production') {
	require('./pwa.js');
}

// in development, set up HMR:
if (module.hot) {
	//require('preact/devtools');   // turn this on if you want to enable React DevTools!
	module.hot.accept('./components/App/App.jsx', () => requestAnimationFrame(init) );
}

init();
