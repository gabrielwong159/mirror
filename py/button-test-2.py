import time
import RPi.GPIO as GPIO
               
GPIO.setmode(GPIO.BCM)

BUTTONPINS = [11, 9]
GPIO.setup(BUTTONPINS, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)


while True:                
        if GPIO.input(11):
                print ("You pressed 11")
        elif GPIO.input(9):
                print("You pressed 9")
        else:
                print ("buttn not being pressd")
        time.sleep(0.5)
