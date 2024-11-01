import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RecoilRoot } from 'recoil';

import HomeScreen from './HomeScreen';
import Screen02 from './Screen02';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={Screen02} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}