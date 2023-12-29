#include <FirebaseESP32.h>
#include <WiFi.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

#define FIREBASE_HOST "who-animal-default-rtdb.asia-southeast1.firebasedatabase.app"

#define FIREBASE_AUTH "AIzaSyAlgWEIvBw44j0PoaEZb0dyMkco1lDSWsg"



#define WIFI_SSID "3F-CHT-WIFI"
#define WIFI_PASSWORD "055339019"

FirebaseData firebaseData;

const char *ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 28800;  // GMT+8
const int daylightOffset_sec = 0;

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, ntpServer, gmtOffset_sec, daylightOffset_sec);

unsigned long lastUpdateTime = 0;
const unsigned long updateInterval = 20000;  // 20 秒

void setup() {
  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // 初始化 NTP 客户端
  timeClient.begin();

  // Firebase 初始化
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  delay(2000);  //Firebase 初始化

  Serial.println("Connected to Firebase");
}

void loop() {

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
  String loc_time = getCurrentTime();

  
  if (millis() - lastUpdateTime >= updateInterval) {
    // 准备上传的数据
    String loc_address = "中興興村村口";
    String loc_image = "www.google.com";
    String loc_msg = "test message1";
    String loc_name = "2號桿";
    String loc_state = "12";

    //JSON
    String jsonString = "{\"loc_address\":\"" + loc_address + "\",\"loc_image\":\"" + loc_image + "\",\"loc_msg\":\"" + loc_msg + "\",\"loc_name\":\"" + loc_name + "\",\"loc_state\":\"" + loc_state + "\",\"loc_time\":\"" + loc_time + "\"}";

    
    Serial.println("Data to upload:");
    Serial.println(jsonString);

    // 上傳 Firestore
    if (Firebase.setJSON(firebaseData, "/ts/location/location1", jsonString)) {
      Serial.println("Data uploaded to Firestore");
    } else {
      Serial.println("Error uploading data to Firestore");
      Serial.println(firebaseData.errorReason());
    }

    // 更新時間
    lastUpdateTime = millis();
  }

 

  delay(100);  
}

String getCurrentTime() {
  String formattedTime = timeClient.getFormattedTime();
  return formattedTime;
}
