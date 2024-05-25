#include <Wire.h>
#include <Adafruit_BMP085.h>
#include <DHT.h>
#include <DHT_U.h>
#include <BH1750FVI.h>

#define DHTPIN 3
#define DHTTYPE DHT11
#define LED1_PIN 4
#define LED2_PIN 5

DHT dht(DHTPIN, DHTTYPE);
Adafruit_BMP085 bmp180;
BH1750FVI lightMeter(BH1750FVI::k_DevModeContHighRes); // Using constructor with device mode

void setup() {
  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);

  dht.begin();
  Serial.begin(9600);

  if (!bmp180.begin()) {
    Serial.println("BMP180 sensor error");
    while (1);
  }

  lightMeter.begin();
}

void loop() {
  // Reading from BMP180 sensor
  Serial.print("Pressure=");
  Serial.print(bmp180.readPressure());
  Serial.print(" hPa,");

  Serial.print("Temperature=");
  Serial.print(bmp180.readTemperature());
  Serial.print(" C,");

  // Reading from DHT11 sensor
  float hum = dht.readHumidity();
  float temp = dht.readTemperature();

  Serial.print("Humidity=");
  Serial.print(hum);
  Serial.print(" %,");

  Serial.print("Temperature=");
  Serial.print(temp);
  Serial.print(" C,");

  // Reading from BH1750FVI sensor
  uint16_t lux = lightMeter.GetLightIntensity();
  Serial.print("Light Intensity=");
  Serial.print(lux);
  Serial.println(" lx");

  // Blink LEDs in a pattern
  digitalWrite(LED2_PIN, LOW);
  digitalWrite(LED1_PIN, HIGH);
  delay(500);
  digitalWrite(LED1_PIN, LOW);
  digitalWrite(LED2_PIN, HsIGH);
  delay(9500);
}
