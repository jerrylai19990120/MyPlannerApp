/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {Welcome} from './components/welcome';
import {Login} from './components/login';
import {Signup} from './components/signup';
import { NavigationContainer } from '@react-navigation/native';
import {Home} from './components/home';

const App = () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcome" options={{gestureEnabled: false}}>
          {(props) => <Welcome {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Login" options={{gestureEnabled: false}}>
          {(props) => <Login {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Signup" options={{gestureEnabled: false}}>
          {(props) => <Signup {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Home" options={{gestureEnabled: false}}>
          {(props) => <Home {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
    
  );
};



export default App;
