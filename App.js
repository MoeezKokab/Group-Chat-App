import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screens/LoginScreen';
import SignUp from './Screens/SignUp';
import Chat from './Screens/Chat';
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='Chat' component={Chat}/>

      </Stack.Navigator>
    </NavigationContainer>

  );
}

