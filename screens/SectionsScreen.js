import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

//TODO: Implementar en esta pantalla las secciones de la app


const SectionsScreen = () => { 

    const navigation = useNavigation()

    return (
        <View>
            <Text
                style={{
                    fontSize: 30,
                    textAlign: "center",
                    marginTop: "20%",
                }}
            > Secciones </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("PresidentesScreen")} 
                style={{
                    backgroundColor: "purple",
                    padding: 10,
                    marginTop: "20%",
                    width: "50%",
                    alignSelf: "center",
                    borderRadius: 10,
                }}
            >
                <Text 
                    style={{ 
                        fontSize: 25,
                        color: "white",
                        textAlign: "center"
                        }}
                        > Presidentes </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigate("CapitalesScreen")}  
                style={{
                    backgroundColor: "purple",
                    padding: 10,
                    marginTop: "20%",
                    width: "50%",
                    alignSelf: "center",
                    borderRadius: 10,
                }}
            >
                <Text 
                    style={{ 
                        fontSize: 25,
                        color: "white",
                        textAlign: "center"
                        }}
                        > Capitales </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("ContinentesScreen")} 
                style={{
                    backgroundColor: "purple",
                    padding: 10,
                    marginTop: "20%",
                    width: "50%",
                    alignSelf: "center",
                    borderRadius: 10,
                }}
            >
                <Text 
                    style={{ 
                        fontSize: 25,
                        color: "white",
                        textAlign: "center"
                        }}
                        > Continentes </Text>
            </TouchableOpacity>
        </View>
    );
}

export default SectionsScreen;