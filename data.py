import serial
import csv
import time
import datetime

fieldnames = ["x_value", "Pressure", "Temperature", "Humidity","Light Intensity"]
x_value = 0

# Open the CSV file in write mode and write the header
with open('arduinoP&T_data.csv', 'w', newline='') as csv_file:
    csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    csv_writer.writeheader()

# Open the serial port connection
ser = serial.Serial('COM8', 9600)  # Change the port name to match your setup

while True:
    # Read data from the serial port
    data = ser.readline().decode().strip()

    # Split the received data into pressure, temperature, and humidity
    parts = data.split(',')
    # Extract the values and convert them to the desired format
    pressure = parts[0].split('=')[1].strip('hPa')
    temperature = parts[1].split('=')[1].strip('C')
    humidity = parts[2].split('=')[1].strip('%')
    Light_intensity= parts[4].split('=')[1].strip('lx')

    # Get the current timestamp
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Write the data to the CSV file
    with open('arduinoP&T_data.csv', 'a', newline='') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        dic = {"x_value": int(x_value), "Pressure": int(pressure), "Temperature": float(temperature), "Humidity": humidity,"Light Intensity": int(Light_intensity)/100}
        print(dic)
        writer.writerow(dic)

    # # Write the data to the text file with timestamp
    with open('text_file.txt', 'a') as file:
        file.write(f'{data} ({current_time})\n')

    x_value += 1
    time.sleep(1)
