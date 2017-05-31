import RPi.GPIO as GPIO
import time
import os
 
GPIO.setmode(GPIO.BCM)
 
TRIG = 23
ECHO = 24
 
print "Distance Measurement In Progress"
 
GPIO.setup(TRIG,GPIO.OUT)
GPIO.setup(ECHO,GPIO.IN)
personInFront = 1
 
try:
    while True:
        GPIO.output(TRIG, False)
        print "Waiting For Sensor To Settle"
 
        GPIO.output(TRIG, True)
        time.sleep(0.00001)
        GPIO.output(TRIG, False)
 
        while GPIO.input(ECHO)==0:
          pulse_start = time.time()
 
        while GPIO.input(ECHO)==1:
          pulse_end = time.time()
 
        pulse_duration = pulse_end - pulse_start
 
        distance = pulse_duration * 17150
        distance = round(distance, 2)
       
        if distance>100 and personInFront >= 1:
            personInFront += 1
            if personInFront >= 60:
                print 'Turning Off Screen'
                os.system('sudo tvservice -o')
                personInFront = 0
            time.sleep(1)
        if distance<100 and personInFront == 0:
            print 'Turning On Screen'
            os.system('sudo tvservice -p')
            time.sleep(0.1)
            os.system('sudo chvt 1')
            os.system('sudo chvt 7')
            personInFront = 1
            time.sleep(0.2)
        else:
            time.sleep(1)
        print "Distance:",distance,"cm"
except KeyboardInterrupt:
    GPIO.cleanup()
    print 'Successful disconnect succesfully disconnected'
