# pzgps-preact

This [Preact based](https://github.com/developit/preact-boilerplate) UI is intended to be used with [pzgps-server](https://github.com/kapusta/pzgps/tree/master/packages/pzgps-server). Please see that package's [README](https://github.com/kapusta/pzgps/blob/master/packages/pzgps-server/README.md) for more information.

---


# Quick-Start Guide

- [Installation](#installation)
- [Development Workflow](#development)
- [Production Build](#production-build)
- [Lint Your Code](#lint-your-code)
- [Testing](#testing)
- [CSS Modules](#css-modules)
- [Handling URLS](#handling-urls)
- [License](#license)


## Installation

    npm install


## Development

Start a live-reload development server

    npm start


This is a full web server nicely suited to your project. Any time you make changes within the `src` directory, it will rebuild and even refresh your browser.


## Production Build

    npm run build


You can now deploy the contents of the `build` directory to production!


## Lint Your Code

    npm run lint


## Testing

    npm test


## CSS Modules

This project is set up to support [CSS Modules](https://github.com/css-modules/css-modules).  By default, styles in `src/style` are **global** (not using CSS Modules) to make global declarations, imports and helpers easy to declare.  Styles in `src/components` are loaded as CSS Modules via [Webpack's css-loader](https://github.com/webpack/css-loader#css-modules).  Modular CSS namespaces class names, and when imported into JavaScript returns a mapping of canonical (unmodified) CSS classes to their local (namespaced/suffixed) counterparts.

When imported, this LESS/CSS:

```css
.redText { color:red; }
.blueText { color:blue; }
```

... returns the following map:

```js
import styles from './style.css';
console.log(styles);
// {
//   redText: 'redText_local_9gt72',
//   blueText: 'blueText_local_9gt72'
// }
```

Note that the suffix for local classNames is generated based on an md5 hash of the file. Changing the file changes the hash.


## Handling URLS

:information_desk_person: This project contains a basic two-page app with [URL routing](http://git.io/preact-router).

Pages are just regular components that get mounted when you navigate to a certain URL. Any URL parameters get passed to the component as `props`.

Defining what component(s) to load for a given URL is easy and declarative. You can even mix-and-match URL parameters and normal props.

```js
<Router>
  <A path="/" />
  <B path="/b" id="42" />
  <C path="/c/:id" />
</Router>
```


---


## License

Apache 2.0
