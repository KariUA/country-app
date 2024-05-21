import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Animated } from "react-native";

const getImageSource = (continentCode) => {
    switch (continentCode) {
        case "AF":
            return require("../assets/africa.png");
        case "AM":
            return require("../assets/america.png");
        case "AS":
            return require("../assets/asia.png");
        case "EU":
            return require("../assets/europa.png");
        case "OC":
            return require("../assets/oceania.png");
        default:
            return require("../assets/world.png");
    }
};


const ContinentsScreen = ({ navigation }) => {
    const [continents] = useState([
        { name: "Africa", code: "AF" },
        { name: "America", code: "AM" },
        { name: "Asia", code: "AS" },
        { name: "Europe", code: "EU" },
        { name: "Oceania", code: "OC" },
    ]);

    const handleContinentPress = (continent) => {
        navigation.navigate("CountriesListScreen", { continent: continent });
    };

    const renderContinentItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleContinentPress(item)}>
            <View style={styles.continentItem}>
                <Image source={getImageSource(item.code)} style={styles.flag} />
                <Text style={styles.continentName}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Continents of the World</Text>
            
            <Image source={require("../assets/world.png")} style={{ width: 200, height: 200, resizeMode: "contain", alignSelf: "center" }} />
            <FlatList
                data={continents}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderContinentItem}
                contentContainerStyle={styles.continentsList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    continentsList: {
        alignItems: "center",
    },
    continentItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "#f0f0f0",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    continentName: {
        fontSize: 18,
        marginLeft: 10,
    },
    flag: {
        width: 30,
        height: 20,
        resizeMode: "contain",
    },
});

export default ContinentsScreen;
