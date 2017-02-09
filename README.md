# pzgps
The goal of this project is to collect data from the a GPS unit and stream that data out to a web front end via a WebSocket.

## Lerna
This project uses [Lerna](https://github.com/lerna/lerna) to manage the server and front end `packages` (in `--independant` mode). You'll need to install it so you can `lerna bootstrap` which will install the dependencies.

    npm install --global lerna


## Pull Requests Accepted!
* I'm very open to changes/fixes/additions, please feel free to submit pull requests.
* This project is meant to be a sandbox for learning various things, so expect things to change.
* If this info turns out to be useful to you, [please let me know](https://twitter.com/dankapusta)!


## Using the Front End Packages

### Preact
Currently the [Preact](https://preactjs.com/) version of the front end has the most code/features/effort.

Run the webserver with `npm start`. There is also code linting configured using eslint which you can run with `npm run lint`.

Note the `packages/pzgps-preact/src/lib/conf.js` file, which should be modified to match your pizero's name on your network. You can change your pizro's name by logging into the pizero, then...
* `raspi-config`
* Go to `Advanced Options`
* Go to `Hostname`
* Type in a new hostname then hit `Ok`

### Enabling a MapQuest staticmap
One of the views can load a [Mapquest "staticmap"](http://www.mapquestapi.com/staticmap/) if you have a "Consumer Key" and provide a module from the NodeJS application that includes that key.

* [Register for a developer account for free](https://developer.mapquest.com/).
* Go to your new profile, and click the "Create a New Key" button.
* You can always find your Consumer Key on the "Keys &amp; Reporting" page after creating one.
* Make a file in the `/packages/pzgps-server/lib` directory named `mqkey.js` and format it like the example below.

    module.exports = {
      'consumerKey': 'PASTE YOUR CONSUMER KEY HERE'
    };

When starting the server use the `--mq` flag. An NPM command is provided in `/packages/pzgps-server/package.json` that will start with the MapQuest module included (eg, `npm run withMapquest` will execute `node index.js --port 9000 --mq`).

Assuming all of the above is in place, the MapQuest component in the UI will receive the key over the WebSocket and use it to formulate the URL to get the static map. Because the client is receiving updates from the server continually, the map will update if the coordinates change.


### AngularJS
In the `/packages/pzgps-angular1/` directory, run `npm start` to start the [webserver](https://github.com/johnpapa/lite-server). The default port of the webserver can be changed in the `/packages/pzgps-angular1/bs-config.json` file.


### ReactJS
In the `/packages/pzgps-reactjs/` directory, run `npm start` to start the webserver. This project uses [webpack](https://webpack.github.io/) and will auto-reload your browser for you.
