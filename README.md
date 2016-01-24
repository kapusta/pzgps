# gps over serial on your raspberry pi

## Assumptions

You...
* Have a #pizero with a GPIO header soldered onto it.
* Have an [Adafruit Ultimate GPS Breakout](https://www.adafruit.com/product/746)
* Have [Raspbian Jezze](https://www.raspberrypi.org/downloads/raspbian/) installed.
* Have [nodejs installed](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions).

After you get the GPIO headers installed on the #pizero and get the pins installed on the GPS unit, connect the wires using [the Adafruit guide](https://learn.adafruit.com/adafruit-ultimate-gps-on-the-raspberry-pi/using-uart-instead-of-usb).

## various useful commands

* Kill gpsd - `sudo killall gpsd`
* Elegantly restart gpsd - `sudo /etc/init.d/gpsd restart`
* Terminal UI for gps data - `cgps -s`
* See data from the device - `cat /dev/ttyAMA0`

## start `gpsd` in verbose/debug mode

Log into the #pizero and install `gpsd`

    sudo apt-get install gpsd gpsd-clients python-gps

...then try this command...

    sudo gpsd /dev/ttyAMA0 -D 2 -n -b -N -P /tmp/gpsd.pid -F /var/run/gpsd.sock

When starting `gpsd` you might see an error like this...

    gpsd:ERROR: can't bind to local socket /var/run/gpsd.sock

You can confirm data is coming to your #pizero with `cat /dev/ttyAMA0` which should show a stream of data. If you see data coming thru but the commands to start `gpsd` failed with an error about not being able to connect, then you might have to disable terminal over serial.

## Disable terminal over serial

These didn't work, not sure why...

    sudo systemctl stop serial-getty@ttyAMA0.service
    sudo systemctl disable serial-getty@ttyAMA0.service

What did work, was turning off serial using `sudo raspi-config`, go to `Advanced Options` then `serial` and turn it off, then reboot.

The Adafruit guide says you can do this from `/etc/inittab` but that file doesn't exist in Raspbian Jesse (it did in Wheezy). Raspbian Jesse has moved everything to services and there is no `/etc/inittab` file at all.


## Configure `gpsd`

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

Then try `cgps -s` and you should now see real data appearing.

# GPS data via nodejs

Now that data is coming from the gps unit, thru `gpsd`, we can read that data from node with the help of [node-gpsd](https://github.com/eelcocramer/node-gpsd). This will handle the starting and stopping of `gpsd` for us and provide the data as JSON.

