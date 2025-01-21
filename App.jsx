
import React, { useState, useEffect } from 'react';
import {
  LogBox,
  View
} from 'react-native';
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './src/screens/Splash';
import Otp from './src/screens/Otp';
import Home from './src/screens/Home';
import BookRequest from './src/screens/BookRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PickUpDetail from './src/screens/PickupDetail';
import Success from './src/screens/Success';
import WaterDay from './src/screens/WaterDay';


function App() {
  const Stack = createNativeStackNavigator();
  const [localValue, setLocal] = useState(null);

  useEffect(() => {
    loadStoredValue();
  }, []);
  const screens = [
    { name: 'Splash', component: Splash },
    { name: 'Otp', component: Otp },
    { name: 'Home', component: Home },
    { name: 'PickUpDetail', component: PickUpDetail },
    { name: 'BookRequest', component: BookRequest },
    { name: 'WaterDay', component: WaterDay },
    { name: 'Success', component: Success },
  ];
  const loadStoredValue = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('token');
      console.log("localValue", value, token)
      if (value) {
        setLocal(value);
      } else {
        setLocal(false)
      }
    } catch (error) {
      console.error('Error loading stored value:', error);
    }
  };
  if (localValue === null) {
   return <View />;
  } 
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationTypeForReplace: 'pop',
          gestureEnabled: true,
        }}
        initialRouteName={localValue ? "BookRequest" : "Splash"}
      >
        {screens.map((item) => (
          <Stack.Screen key={item.name} name={item.name} component={item.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
