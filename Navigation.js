import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


// Importing screens
import HomeScreen from "./screens/HomeScreen";
import StackScreen from "./screens/StackScreen";
import SettingScreen from "./screens/SettingsScreen";
import SectionsScreen from "./screens/SectionsScreen";
import PresidentesScreen from "./screens/PresidentesScreen";
import CapitalesScreen from "./screens/CapitalesScreen";
import ContinentesScreen from "./screens/ContinentesScreen";
import LoginScreen from "./screens/LoginScreen";


const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Se crea un stack para la pantalla principal
function MyStack() {
    return ( 
        <HomeStack.Navigator
            initialRouteName="HomeScreen"
        
        >
            <HomeStack.Screen
                name="LoginScreen"
                component={LoginScreen}
            />
            <HomeStack.Screen
                name="HomeScreen"
                component={HomeScreen}
            />
            <HomeStack.Screen
                name="Stack"
                component={StackScreen}
            />
            <HomeStack.Screen
                name="PresidentesScreen"
                component={PresidentesScreen}
                options={{
                    headerBackTitleVisible: false
                }}
            />
            <HomeStack.Screen
                name="CapitalesScreen"
                component={CapitalesScreen}
                options={{
                    headerBackTitleVisible: false
                }}
            />
            <HomeStack.Screen
                name="ContinentesScreen"
                component={ContinentesScreen}
                options={{
                    headerBackTitleVisible: false
                }}
            />
        </HomeStack.Navigator>
    );
}

function MyTabs() {
    return (

        //Se asigna que la pantalla de inicio sea HomeScreen, se le asigna un icono y un color cuando esta activo
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: "purple",
            }}
        >
            
            <Tab.Screen
                name="Home"
                component={MyStack}
                options={{
                    tabBarLabel: "Principal",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={30} />
                    ),
                    headerShown: false
                }}

            />
            <Tab.Screen
                name="Sections"
                component={SectionsScreen}
                options={{
                    tabBarLabel: "Sections",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="category" color={color} size={30} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingScreen}
                options={{
                    tabBarLabel: "Settings",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="brightness-5" color={color} size={30} />
                    ), 
                    headerShown: false
                }}
                
            />
        </Tab.Navigator>

    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}




