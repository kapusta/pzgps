# pzgps
The goal of this project is to collect data from a GPS unit connected to a Raspberry Pi Zero and stream that data out to a web front end via a WebSocket.

## Lerna
This project uses [Lerna](https://github.com/lerna/lerna) to manage the server and front end `packages` (in `--independant` mode). If you want to develop anything, you'll need to install Lerna so you can `lerna bootstrap` which will install all of the dependencies for each repo.

    npm install --global lerna

## Pull Requests Accepted!
* Please feel free to submit pull requests.
* This project is meant to be a sandbox for learning various things, so expect things to change.
* If this info turns out to be useful to you, [please let me know](https://twitter.com/dankapusta)!

## Using the Server Package
The server package, that provides the GPS data over the WebSocket, resides in [`/packages/pzgps-server/`](https://github.com/kapusta/pzgps/tree/master/packages/pzgps-server) and has [a thorough README.md that you should read](https://github.com/kapusta/pzgps/blob/master/packages/pzgps-server/README.md).

## Using the Front End Packages

### Preact
Currently [the Preact version](https://github.com/kapusta/pzgps/tree/master/packages/pzgps-preact) of the front end has the most code/features/effort.

Run the webserver with `npm start`.

Note the `packages/pzgps-preact/src/lib/conf.js` file, which should be modified to match your pizero's name on your network. You can change the name by logging into the pizero, then...
* `raspi-config`
* Go to `Advanced Options`
* Go to `Hostname`
* Type in a new hostname then hit `Ok`

### Enabling a MapQuest staticmap
One of the views can load a [Mapquest "staticmap"](http://www.mapquestapi.com/staticmap/) if you have a "Consumer Key" and provide a module from the NodeJS application that includes that key.

* [Register for a developer account for free](https://developer.mapquest.com/).
* Go to your new profile, and click the "Manage Keys" on the left side menu.
* Click the "Create a New Key" button and provide a name (callback url is not needed for this project).
* You can always find your Consumer Key on the "Manage Keys" page after creating one.
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
