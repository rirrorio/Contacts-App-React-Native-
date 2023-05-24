import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import MainPage from './Pages/MainPage'
import DetailPage from './Pages/DetailPage'

const Stack = createNativeStackNavigator()
const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background:'black',
    color:'white'
  },
};

export default function App() {
  return (
    <NavigationContainer theme={myTheme}>
      <Stack.Navigator>
        <Stack.Screen name='MainPage' component={MainPage}/>
        <Stack.Screen name='DetailPage' component={DetailPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


