#!/bin/bash
sudo date -s "$(curl -s --head http://google.com | grep ^Date: | sed 's/Date: //g')"
sudo modprobe -i uinput
cd /home/pi/mirror
node server.js