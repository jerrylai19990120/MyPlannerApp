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
import {AddTask} from './components/addTask';
import FlashMessage from 'react-native-flash-message';

const App = () => {

  const [user, setUser] = React.useState({
    username: '',
    loggedIn: false
  })

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Welcome" options={{gestureEnabled: false}}>
          {(props) => <Welcome {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Login" options={{gestureEnabled: false}}>
          {(props) => <Login {...props} setUser={setUser}/>}
          </Stack.Screen>
          <Stack.Screen name="Signup" options={{gestureEnabled: false}}>
          {(props) => <Signup {...props} setUser={setUser}/>}
          </Stack.Screen>
          <Stack.Screen name="Home" options={{gestureEnabled: false}}>
          {(props) => <Home {...props} setUser={setUser} username={user.username}/>}
          </Stack.Screen>
          <Stack.Screen name="AddTask" options={{gestureEnabled: false}}>
          {(props) => <AddTask {...props} owner={user.username}/>}
          </Stack.Screen>
        </Stack.Navigator>
        <FlashMessage position='top' autoHide={true}/>
    </NavigationContainer>
    
  );
};



export default App;
