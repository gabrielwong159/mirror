#!/bin/bash
git -C /home/pi/mirror/ pull
sudo modprobe -i uinput
sudo python /home/pi/mirror/py/mirror-button.py &
sudo python /home/pi/mirror/py/powersaving.py &
