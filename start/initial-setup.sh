#!/bin/bash
sudo sed -i "s/exit 0/\/home\/pi\/mirror\/start\/start.sh\nexit 0/g" /etc/rc.local
echo "chromium-browser --disable-web-security --user-data-dir --kiosk --noerrdialogs --disable-session-crashed-bubble --disable-infobars https://smart-mirror.azurewebsites.net/hide-motd" >> /home/pi/.config/lxsession/LXDE-pi/autostart
echo "display_rotate=3" | sudo tee -a /boot/config.txt
