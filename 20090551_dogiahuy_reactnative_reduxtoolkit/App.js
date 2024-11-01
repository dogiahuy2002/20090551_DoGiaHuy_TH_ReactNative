import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Image, Pressable, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store';

import HomeScreen from "./HomeScreen"
import Screen02 from "./Screen02"


const Stack = createNativeStackNavigator();

export default App = () => {
return(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={Screen02} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    )
};