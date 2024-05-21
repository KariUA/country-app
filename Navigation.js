import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


// Importing screens
import HomeScreen from "./screens/HomeScreen";
import SettingScreen from "./screens/SettingsScreen";
import SectionsScreen from "./screens/SectionsScreen";
import ONUScreen from "./screens/ONUScreen";
import CapitalScreen from "./screens/CapitalScreen";
import ContinentsScreen from "./screens/ContinentsScreen";
import LoginScreen from "./screens/LoginScreen";
import CountryScreen from "./screens/CountryScreen";
import CountriesListScreen from "./screens/CountriesLisScreen";


const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Se crea un stack para la pantalla principal
function MyStack() {
    return ( 
        <HomeStack.Navigator
            initialRouteName="LoginScreen"
        
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
                name="ONUScreen"
                component={ONUScreen}
                options={{
                    headerBackTitleVisible: false
                }}
            />
            <HomeStack.Screen
                name="CapitalScreen"
                component={CapitalScreen}
                options={{
                    headerBackTitleVisible: false
                }}
            />
            <HomeStack.Screen
                name="ContinentsScreen"
                component={ContinentsScreen}
                options={{
                    headerBackTitleVisible: false
                }}
            />
            <HomeStack.Screen
                name="CountryScreen"
                component={CountryScreen}
                options={{
                    headerBackTitleVisible: false
                }}
            />
            <HomeStack.Screen
                name="CountriesListScreen"
                component={CountriesListScreen}
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
            initialRouteName="HomeScreen"
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
                    tabBarLabel: "Perfil de usuario",
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




