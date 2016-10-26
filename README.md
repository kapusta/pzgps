# pzgps
The goal of this project is to collect data from the a GPS unit and stream that data out to a web front end via a WebSocket.

We'll use [NodeJS](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) and [node-gpsd](https://github.com/eelcocramer/node-gpsd) to read and process the data, make it available via  [ws](https://www.npmjs.com/package/ws), and render in the UI with the help of [angular-websocket](https://github.com/AngularClass/angular-websocket).

## Pull Requests Accepted
* If this info turns out to be useful to you, [please let me know](https://twitter.com/dankapusta)!
* I'm very open to changes/fixes/additions, please feel free to submit pull requests.

## Assumptions
You...
* Have a [#pizero](https://www.raspberrypi.org/products/pi-zero/) with an [ARM11](https://en.wikipedia.org/wiki/ARM11) and a GPIO header soldered onto it.
* Have an [Adafruit Ultimate GPS Breakout](https://www.adafruit.com/product/746)
* Have [Raspbian Jessie](https://www.raspberrypi.org/downloads/raspbian/) installed.
* Have [Connected your Adafruit GPS Breakout](https://learn.adafruit.com/adafruit-ultimate-gps-on-the-raspberry-pi/using-uart-instead-of-usb)

## Project Structure

* At the root of the repo is an `index.js` file, which reads the GPS data and provides it over a WebSocket.
* A sample AngularJS app to view the data lives in the `angular1` directory.

In both locations is a `package.json` file. Run `npm install` to install the dependencies ('deps') for each part of the project. In the future, more front ends will be provided, each with their own deps to be installed (if you want to use that front end).

You'll run each part of the project by running `npm start` where the `package.json` is located.


## Installing NodeJS
The version of NodeJS you get via `apt-get install nodejs` is out of date (so you'd be missing some important security patches).

If you want to compile node from scratch on your [#pizero](https://www.raspberrypi.org/products/pi-zero/) and wait all night for it to complete, then [check out this guide](https://www.youtube.com/watch?v=J6g53Hm0rq4).

If you want to make things a bit easier, then download the version of NodeJS you want using `wget` and install it directly. In this case we'll download the latest version for ARM on the 4.x branch...
* Log in to your pi and remain in your home directory
* `wget https://nodejs.org/dist/v4.6.0/node-v4.6.0-linux-armv6l.tar.xz`
* `cd /usr/local`
* `sudo tar --strip-components 1 -xvf ~/node-v4.6.0-linux-armv6l.tar.xz`
* `cd && rm node-v4.6.0-linux-armv6l.tar.xz`
* `node -v` should yield `v4.6.0`
* `npm -v` should yield `2.15.9`

Your `/usr/local` dir probably has a few files left over from the install (ie, CHANGELOG.md, LICENSE, README.md). You can safely remove those.


## Various Useful Commands
* `sudo apt-get update` and `sudo apt-get upgrade` to update your installed packages
* `sudo killall gpsd` - To kill gpsd
* `sudo /etc/init.d/gpsd restart` - To elegantly restart gpsd
* `cgps -s` - to open a terminal UI for gps data
* `cat /dev/ttyAMA0` - See raw data from the [Adafruit Ultimate GPS Breakout](https://www.adafruit.com/product/746) -


## Installing `gpsd`
Log into your pi and install `gpsd`

    sudo apt-get install gpsd gpsd-clients python-gps

Start `gpsd` in verbose/debug mode...

    sudo gpsd /dev/ttyAMA0 -D 2 -n -b -N -P /tmp/gpsd.pid -F /var/run/gpsd.sock

When starting `gpsd` you might see an error like this...

    gpsd:ERROR: can't bind to local socket /var/run/gpsd.sock

You can confirm data is coming to your [#pizero](https://www.raspberrypi.org/products/pi-zero/) with `cat /dev/ttyAMA0` which should show a stream of data. If you see data coming thru but the commands to start `gpsd` failed with an error about not being able to connect, then you might have to disable terminal over serial.

## How disable terminal over serial
These didn't work, not sure why...

    sudo systemctl stop serial-getty@ttyAMA0.service
    sudo systemctl disable serial-getty@ttyAMA0.service

What did work was...
* `sudo raspi-config`
* go to `Advanced Options`
* then `serial` and turn it off
* reboot

The Adafruit guide mentioned above says you can do this from `/etc/inittab` but that file doesn't exist in Raspbian Jessie (it did in Wheezy). Raspbian Jessie has moved everything to services and there is no `/etc/inittab` file at all, so it's best to use the `raspi-config` command.


## Configuring gpsd

To have `gpsd` start up correctly, edit `/etc/default/gpsd`

    # Default settings for the gpsd init script and the hotplug wrapper.

    # Start the gpsd daemon automatically at boot time
    START_DAEMON="true"

    # Use USB hotplugging to add new USB devices automatically to the daemon
    USBAUTO="false"

    # Devices gpsd should collect to at boot time.
    # They need to be read/writeable, either by user gpsd or the group dialout.
    DEVICES="/dev/ttyAMA0"

    # Other options you want to pass to gpsd
    GPSD_OPTIONS

    GPSD_SOCKET="/var/run/gpsd.sock"


Then restart: `sudo /etc/init.d/gpsd restart`

Then try `cgps -s` and you should now see real data. If the GPS Breakout can't see the sky then you might see `no fix` which means it can't see any satellites. Either go outside or put the [#pizero](https://www.raspberrypi.org/products/pi-zero/) on a window sill. 😀

## GPS data via nodejs

Now that data is coming from the gps unit, thru `gpsd`, we can read that data from node with the help of [node-gpsd](https://github.com/eelcocramer/node-gpsd).

Run `npm install` to install the deps, including [node-gpsd](https://github.com/eelcocramer/node-gpsd)

This will handle the streaming of data from `gpsd` for us and provide the data as JSON (it can also start and stop the daemon, you should read the docs).

Have a look at the `index.js` in this repo and run `npm start` in your terminal. If everything is set up correctly, you should see some basic info, then a bunch of TPV events streaming by. Now you have something you can write an application around.

## Auto Start the WebSocket server at System Boot

After getting everything set up, you might want to have the WebSocket server [auto-start when your pizero boots up](https://www.raspberrypi.org/documentation/linux/usage/rc-local.md).
* Look in the `package.json` file for the `scripts` section
* note the value for the `start` command
* Add that command to `rc.local` with the correct path to the `index.js` file

Your entry in `rc.local` will look something like this...

    /usr/local/bin/node /home/pi/Projects/pzgps/index.js --port 9000 &

Change the port number as needed.


## Using the WebSocket from a Front End

### AngularJS
In the `angular1` directory, install the deps by running `npm install` then run `npm start` to start the [webserver](https://github.com/johnpapa/lite-server). Using your web browser, navigate to your pizero's IP address on port 9001 (the default). The default port of the webserver can be changed in the `angular1/bs-config.json` file.

Assuming the millions of things above went right, you'll see some GPS data in your web browser.

### ReactJS
As of this writing, the UI provided in the `reactjs` directory doesn't actually do anything. OVer time it will be built up to provide feature parity with the `angular1` front end.

## Enabling a MapQuest staticmap

One of the views can load a [Mapquest "staticmap"](http://www.mapquestapi.com/staticmap/) if you have a "Consumer Key" and provide a module that includes that key.

* [Register for a developer account for free](https://developer.mapquest.com/).
* Go to your new profile, and click the "Create a New Key" button.
* You can always find your Consumer Key on the "Keys &amp; Reporting" page after creating one.
* Make a file in the `lib` directory named `mqkey.js` and format it like the example below.

    module.exports = {
      'consumerKey': 'PASTE YOUR CONSUMER KEY HERE'
    };

On the command line you can now start the server using the `--mq` flag. An NPM command is provided in `package.json` that will start with the MapQuest module included (eg, `npm run withMapquest` will execute `node index.js --port 9000 --mq`).

Assuming all of the above is in place, the MapQuest component in the UI will receive the key over the WebSocket and use it to formulate the URL to get the static map. Because the client is receiving updates from the server continually, the map will update if the coordinates change.
