# gps over serial on your raspberry pi

## Hello

* If this info turns out to be useful to you, [let me know](https://twitter.com/dankapusta)!
* I'm very open to changes/fixes/additions, please feel free to submit pull requests.


## Assumptions

You...
* Have a #pizero with an [ARM11](https://en.wikipedia.org/wiki/ARM11) and a GPIO header soldered onto it.
* Have an [Adafruit Ultimate GPS Breakout](https://www.adafruit.com/product/746)
* Have [Raspbian Jessie](https://www.raspberrypi.org/downloads/raspbian/) installed.
* Have [Connected your Adafruit GPS Breakout](https://learn.adafruit.com/adafruit-ultimate-gps-on-the-raspberry-pi/using-uart-instead-of-usb)

## Installing NodeJS
The goal of this project is to collect data from the GPS and dump it into a database to be queried out later. We'll use [NodeJS](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) and [node-gpsd](https://github.com/eelcocramer/node-gpsd) to read, process and store the data.

If you want to compile node from scratch on your pi and wait all night for it to complete, then [check out this guide](https://www.youtube.com/watch?v=J6g53Hm0rq4).

If you want to make things a bit easier then download the version of Node you want using wget and install it directly. In this case we'll download the latest version for ARM on the 4.x branch...
* Log in to your pi and remain in your home directory
* `wget https://nodejs.org/dist/v4.6.0/node-v4.6.0-linux-armv6l.tar.xz`
* `cd /usr/local`
* `sudo tar --strip-components 1 -xvf ~/node-v4.6.0-linux-armv6l.tar.xz`
* `cd && rm node-v4.6.0-linux-armv6l.tar.xz`
* `node -v` should yield `v4.6.0`
* `npm -v` should yield `2.15.9`

Your `/usr/local` dir probably has a few files left over from the install (ie, CHANGELOG.md, LICENSE, README.md). You can safely remove those.


## Various Useful Commands
* Kill gpsd - `sudo killall gpsd`
* Elegantly restart gpsd - `sudo /etc/init.d/gpsd restart`
* Terminal UI for gps data - `cgps -s`
* See raw data from the device - `cat /dev/ttyAMA0`


## Start gpsd in verbose/debug mode
Log into your pi and install `gpsd`

    sudo apt-get install gpsd gpsd-clients python-gps

...then try this command...

    sudo gpsd /dev/ttyAMA0 -D 2 -n -b -N -P /tmp/gpsd.pid -F /var/run/gpsd.sock

When starting `gpsd` you might see an error like this...

    gpsd:ERROR: can't bind to local socket /var/run/gpsd.sock

You can confirm data is coming to your #pizero with `cat /dev/ttyAMA0` which should show a stream of data. If you see data coming thru but the commands to start `gpsd` failed with an error about not being able to connect, then you might have to disable terminal over serial.

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


## Configure gpsd

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

Then try `cgps -s` and you should now see real data. If the GPS Breakout can't see the sky then you might see `no fix` which means it can't see any satellites. Either go outside or put the #pizero on a window sill. 😀

## GPS data via nodejs

Now that data is coming from the gps unit, thru `gpsd`, we can read that data from node with the help of [node-gpsd](https://github.com/eelcocramer/node-gpsd).

This will handle the starting and stopping of `gpsd` for us and provide the data as JSON.

Have a look at the index.js file in this repo and try `node index.js` in your terminal. If everything is set up correctly, you should see some basic info, then a bunch of TPV events streaming by. Now you have something you can write an application around.
