import time
import RPi.GPIO as GPIO

               
        GPIO.setmode(GPIO.BCM)

        GPIO.setup(17,GPIO.IN)
        GPIO.setup(24,GPIO.OUT)

        input = GPIO.input(17)

        prev_input = 0
        while True:
                input = GPIO.input(17)
                if ((not prev_input) and input):
                        print("Button pressed")
                prev_input = input
                time.sleep(0.1)
