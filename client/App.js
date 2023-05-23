import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import MainPage from './components/MainPage'
import DetailPage from './components/DetailPage'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>wazzap </Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='MainPage' component={MainPage}/>
        <Stack.Screen name='DetailPage' component={DetailPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
