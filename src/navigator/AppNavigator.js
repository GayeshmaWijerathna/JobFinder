// In App.js in a new project

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import Home from '../screens/Home';
import Login from '../screens/Login'; 

const Stack = createNativeStackNavigator();


function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ 
            headerStyle: { backgroundColor: '#f8b500' }, // Set your desired header color here
            headerTintColor: '#fff', // Set the color of the header text
            headerTitleStyle: { fontWeight: 'bold' }, // Optionally, customize the header title style
          }} 
        />
      

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;