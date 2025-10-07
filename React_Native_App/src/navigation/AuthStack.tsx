import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import { AuthStackParamList } from '../types';
import RegistrationScreen from '../screens/Auth/RegistrationScreen';


const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Login"
        >
            <Stack.Screen name="Login" component={LoginScreen} />

            <Stack.Screen name="Registration" component={RegistrationScreen} />
        </Stack.Navigator>
    );
}

export default AuthStack;
