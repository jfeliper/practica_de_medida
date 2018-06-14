
#ifndef power_sensor_h
#define power_sensor_h

// *******************************************************
// ******** CONFIGURACION SENSORES DE POTENCIA    ********
// *******************************************************

#define NUMBER_OF_PWR_SENSORS 8

#define MAME_PWR_1 "Pinza_1"
#define ENTER_1 A0
#define CURRENT_CONST_1 30

#define MAME_PWR_2 "Pinza_2"
#define ENTER_2 A1
#define CURRENT_CONST_2 30

#define MAME_PWR_3 "Pinza_3"
#define ENTER_3 A2
#define CURRENT_CONST_3 30

#define MAME_PWR_4 "Pinza_4"
#define ENTER_4 A3
#define CURRENT_CONST_4 30

#define MAME_PWR_5 "Pinza_5"
#define ENTER_5 A4
#define CURRENT_CONST_5 30

#define MAME_PWR_6 "Pinza_6"
#define ENTER_6 A5
#define CURRENT_CONST_6 30

#define MAME_PWR_7 "Pinza_7"
#define ENTER_7 A6
#define CURRENT_CONST_7 30

#define MAME_PWR_8 "Pinza_8"
#define ENTER_8 A7
#define CURRENT_CONST_8 30


// *******************************************************

#include "EmonLib.h"                   // Include Emon Library
EnergyMonitor emon1;

// variable declaration

String name_pwr[]=
  {
    MAME_PWR_1,
    MAME_PWR_2,
    MAME_PWR_3,
    MAME_PWR_4,
    MAME_PWR_5,
    MAME_PWR_6,
    MAME_PWR_7,
    MAME_PWR_8
  };

int enter_pin[]=
  {
    ENTER_1,
    ENTER_2,
    ENTER_3,
    ENTER_4,
    ENTER_5,
    ENTER_6,
    ENTER_7,
    ENTER_8
    
  };

float current_const[]=
  {
    CURRENT_CONST_1,
    CURRENT_CONST_2,
    CURRENT_CONST_3,
    CURRENT_CONST_4,
    CURRENT_CONST_5,
    CURRENT_CONST_6,
    CURRENT_CONST_7,
    CURRENT_CONST_8
    
  }; 

// Function Prototypes
void buildPowerMessage(uint8_t);


void buildPowerMessage(uint8_t output)
  {
    for (uint8_t i=0; i < NUMBER_OF_PWR_SENSORS; i++)
      {      
        emon1.current(enter_pin[i],current_const[i]);      // Current: input pin, calibration.

        for (uint8_t i=0; i<6; i++)
          {
            double Irms = emon1.calcIrms(1480);  // Calculate Irms only
          }
        
        double Irms = emon1.calcIrms(1480);
        double Pwr=(Irms*220.0); 
      
        String value_pwr = String(Pwr,2);    
        if (output==0) 
          {
            Serial.println("wifiSerialInit_init");
            Serial.println (name_pwr[i] + ":" + value_pwr);
            wifiSerialInit.println (name_pwr[i] + ":" + value_pwr);
            Serial.println("wifiSerialInit_end");            
          }
        if (output==1) 
          {
            Serial.println("wifiSerialInit.println");
            Serial.println (name_pwr[i] + ":" + value_pwr);
            

          }
      }
  }

#endif
