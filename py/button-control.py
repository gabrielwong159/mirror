import time
import uinput
import RPi.GPIO as GPIO

keyList = [uinput.KEY_1, uinput.KEY_2, uinput.KEY_3, uinput.KEY_4, uinput.KEY_5, uinput.KEY_6]
device = uinput.Device(keyList)

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

BUTTONPINS = [11, 9, 10, 7, 8, 25]
GPIO.setup(BUTTONPINS, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)

prev = [False, False, False, False, False, False]
curr = [False, False, False, False, False, False]

def pressed(num):
	device.emit_click(keyList[num])

def isPressed(num):
	if GPIO.input(BUTTONPINS[num]):
		curr[num] = True
		if prev[num] == False:
			pressed(num)
			print "activating", (num)
			time.sleep(0.2)
	else:
		curr[num] = False
	prev[num] = curr[num]

while True:
	try:
		for i in range(len(BUTTONPINS)):
			if isPressed(i):
				pressed(i)

	except KeyboardInterrupt:
		print "\nexiting\n"
		GPIO.cleanup()
