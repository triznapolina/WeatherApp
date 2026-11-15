import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WelcomeScreen from './src/screens/WelcomeScreen';
import TodayScreen from './src/screens/TodayScreen';
import WeekForecastScreen from './src/screens/WeekForecastScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { SettingsProvider } from './src/context/SettingsContext';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <SettingsProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Welcome" component={WelcomeScreen} />
                        <Stack.Screen name="Today" component={TodayScreen} />
                        <Stack.Screen name="WeekForecast" component={WeekForecastScreen} />
                        <Stack.Screen name="Settings" component={SettingsScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </SettingsProvider>
        </SafeAreaProvider>
    );
}