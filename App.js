import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import TodayScreen from './src/screens/TodayScreen';
import WeekForecastScreen from './src/screens/WeekForecastScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Today" component={TodayScreen} />
        <Stack.Screen name="WeekForecast" component={WeekForecastScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}