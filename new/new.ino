#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

#define WIFI_SSID "3F-CHT-WIFI"
#define WIFI_PASSWORD "055339019"

const char *mqtt_server = "broker.MQTTGO.io";
const int mqtt_port = 1883;
const char *mqtt_topic = "test";

WiFiClient espClient;
PubSubClient mqttClient(espClient);

const char *ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 28800;  // GMT+8
const int daylightOffset_sec = 0;
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, ntpServer, gmtOffset_sec, daylightOffset_sec);

unsigned long lastUpdateTime = 0;
const unsigned long updateInterval = 20000;  // 20 秒

// Firebase 的路徑
const char *firebase_path = "/location/location1";

void setup() {
  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // 初始化 NTP 客戶端
  timeClient.begin();

  // 初始化 MQTT 客戶端
  mqttClient.setServer(mqtt_server, mqtt_port);

  Serial.println("Connected to MQTT");
}

void loop() {
  if (!mqttClient.connected()) {
    reconnectMQTT();
  }

  mqttClient.loop();

  // WIFI
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected. Reconnecting...");
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
  }

  timeClient.update();

  // 取得目前時間
  long loc_time = getCurrentTimestamp();

  if (millis() - lastUpdateTime >= updateInterval) {
    // 准备上传的数据
    String loc_address = "中興興村村口";
    String loc_name = "2號桿";
    String loc_state = "12";

    // JSON
    DynamicJsonDocument jsonDoc(256);
    jsonDoc["loc_address"] = loc_address;
    jsonDoc["loc_name"] = loc_name;
    jsonDoc["loc_state"] = loc_state;
    jsonDoc["loc_time"] = loc_time;

    String jsonString;
    serializeJson(jsonDoc, jsonString);

    Serial.println("Data to upload:");
    Serial.println(jsonString);

    // Publish to MQTT
    mqttClient.publish(mqtt_topic, (firebase_path + jsonString).c_str());  // 指定 Firebase 的路徑

    // 更新時間
    lastUpdateTime = millis();
  }

  delay(100);
}

long getCurrentTimestamp() {
  return timeClient.getEpochTime();
}

void reconnectMQTT() {
  while (!mqttClient.connected()) {
    Serial.println("Connecting to MQTT...");
    if (mqttClient.connect("ESP32Client")) {
      Serial.println("Connected to MQTT");
      mqttClient.subscribe(mqtt_topic);
    } else {
      Serial.println("Connection failed. Retrying in 5 seconds...");
      delay(5000);
    }
  }
}
