import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import { AuthStackParamList, HomeStackParamList } from '../types';
import RegistrationScreen from '../screens/Auth/RegistrationScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import MyCartScreen from '../screens/HomeScreens/MyCartScreen';
import MyOrdersScreen from '../screens/HomeScreens/MyOrdersScreen';
import theme from '../styles/theme';


const Tab = createBottomTabNavigator<HomeStackParamList>();

function HomeStack() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarActiveTintColor: '#2196F3',
                tabBarInactiveTintColor: 'gray',
                lazy: true
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Home", tabBarIcon: ({ color, size }) => <Icon name='home' color={color} size={size} /> }} />
            <Tab.Screen name="MyCart" component={MyCartScreen} options={{ title: "My Cart", tabBarIcon: ({ color, size }) => <Icon name='shopping-cart' color={color} size={size} /> }} />
            <Tab.Screen name="MyOrders" component={MyOrdersScreen} options={{ title: "My Orders", tabBarIcon: ({ color, size }) => <Icon name='list-alt' color={color} size={size} /> }} />
        </Tab.Navigator>
    );
}

export default HomeStack;