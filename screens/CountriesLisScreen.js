import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";

const CountriesListScreen = ({ navigation, route }) => {
    const { continent } = route.params;
    const [countries, setCountries] = useState([]);
    //la imagen del continente que esta en assets
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
    }


    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/region/${continent.code}`);
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, [continent]);

    const handleCountryPress = (country) => {
        navigation.navigate("CountryScreen", { country: country });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCountryPress(item)}>
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.flags.png }} style={styles.flag} />
                <View style={styles.countryInfo}>
                    <Text style={styles.countryName}>{item.name.common}</Text>
                    <Text>Population: {item.population}</Text>
                    <Text>Area: {item.area} km²</Text>
                    <Text>Country Code: {item.cca2}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            
            <Text style={styles.header}>Countries in {continent.name} </Text>
            <Image source={getImageSource(continent.code)} style={{ width: 100, height: 100, resizeMode: "contain", alignSelf: "center" , marginBottom: 20}} />
            <Text style={styles.textTitle}>Total: {countries.length} countries</Text>
            <FlatList
                data={countries}
                renderItem={renderItem}
                keyExtractor={(item) => item.cca3}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    header: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "bold",

    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: "#f0f0f0",
        padding: 10,
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
    flag: {
        width: 50,
        height: 30,
        resizeMode: "contain",
        marginRight: 10,
    },
    countryInfo: {
        flex: 1,
    },
    countryName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    additionalInfo: {
        //linea de codigo para que no se vea el texto cortado
        flexWrap: 'wrap',
        fontSize: 12,
        color: "#666",
        lineHeight: 20,
    },
    textTitle: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "purple",
        color: "white",
        padding: 5,
        borderRadius: 10,
        marginBottom: 10,
    },
});

export default CountriesListScreen;
