import React from 'react';
import { View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './components/Home';
import EscapeGameList from './components/EscapeGameList';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="EscapeGameList" component={EscapeGameList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;