//Sourced from: https://sensorkit.arduino.cc/sensorkit/module/lessons/lesson/09-the-accelerometer-sensor --Start//

#include "Arduino_SensorKit.h"

 //End
 
 
//Sourced from Week6 threeSensorExanmple--Start
int sensors[3];

//End


//Sourced from: https://sensorkit.arduino.cc/sensorkit/module/lessons/lesson/09-the-accelerometer-sensor --Start//
void setup() {
   // put your setup code here, to run once:
  
  Serial.begin(9600);
  while(!Serial);
  
  Accelerometer.begin();  
}
 //End



void loop(){
  
//Sourced from Week6 threeSensorExanmple Modified By Christian Gomes- Oct 19th,2022--Start
//The sensors used before where the button,ptentiometer and light sensor//

 
   sensors[0] =(Accelerometer.readX());
    
   
   sensors[1] = (Accelerometer.readY());
    
 
   sensors[2] = (Accelerometer.readZ());

  //End


//Sourced from Week6 threeSensorExanmple--Start
        for (int thisSensor = 0; thisSensor < 3; thisSensor++) {

        int sensorValue = sensors[thisSensor];
      
      // if you're on the last sensor value, end with a println()
      // otherwise, print a comma
      //The number of sensors needs to be hard coded, in this example 3 sensors are running 0,1,2
 
      Serial.print(sensorValue);
      if (thisSensor == 2) {
         Serial.println();
      } else {
         Serial.print(",");
      }
   }
    delay(100);              
}
//Sourced from Week6 threeSensorExanmple--Start//--End
