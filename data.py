import serial
import csv
import time
import datetime

fieldnames = ["x_value", "Pressure", "Temperature", "Humidity"]
x_value = 0

# Open the serial port connection
ser = serial.Serial('COM8', 9600)  # Change the port name to match your setup

while True:
    # Read data from the serial port
    data = ser.readline().decode().strip()
    print(data)

    # Split the received data into pressure, temperature, and humidity
    parts = data.split()
    # Extract the values and convert them to the desired format
    pressure = parts[0].split('=')[1].strip('hPa')
    temperature = parts[1].split('=')[1].strip('C')
    humidity = parts[2].split('=')[1].strip('%')

    # Write the data to the text file with timestamp
    with open('data.txt', 'w') as file:
        file.write(f'{pressure},{temperature},{humidity}\n')

    x_value += 1
    time.sleep(1)
