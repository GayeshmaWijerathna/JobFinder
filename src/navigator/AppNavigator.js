// In App.js in a new project

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Apply from '../screens/Apply';



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
            headerStyle: { backgroundColor: '#033d4a' }, // Set your desired header color here
            headerTintColor: '#fff', // Set the color of the header text
            headerTitleStyle: { fontWeight: 'bold' }, // Optionally, customize the header title style
          }} 
        />
        <Stack.Screen 
          name="Apply" 
          component={Apply} 
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