import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";

const CapitalsScreen = ({ navigation }) => {
    const [capitals, setCapitals] = useState([]);

    useEffect(() => {
        fetchCapitals();
    }, []);

    const fetchCapitals = async () => {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all?fields=capital,name");
            const data = await response.json();
            const sortedCapitals = data
                .filter(country => country.capital && country.capital.length > 0) // Remove countries without capitals
                .map(country => country.capital[0]) // Extract the first capital from each country
                .sort((a, b) => a.localeCompare(b)); // Sort the capitals alphabetically
            setCapitals(sortedCapitals);
        } catch (error) {
            console.error("Error fetching capitals:", error);
        }
    };

    const handleCapitalPress = async (capital) => {
        try {
            const response = await fetch(`https://restcountries.com/v3.1/capital/${capital}`);
            const data = await response.json();
            navigation.navigate("CountryScreen", { country: data[0] }); // Use the first element of the response array
        } catch (error) {
            console.error("Error fetching country details:", error);
        }
    };

    const renderCapitalItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCapitalPress(item)}>
            <View style={styles.capitalItem}>
                <Text style={styles.capitalText}>{item}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Capitals of the World</Text>
            <Text style={styles.CapitalTotal}>Total: {capitals.length} capitals</Text>
            <FlatList
                data={capitals}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderCapitalItem}
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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    capitalItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    capitalText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    CapitalTotal: {
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

export default CapitalsScreen;
