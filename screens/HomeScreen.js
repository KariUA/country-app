import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const HomeScreen = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused(); 

    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    const fetchCountries = async () => {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            const data = await response.json();
            setCountries(data);
            const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
            setFilteredCountries(sortedCountries);
            
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []); 

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchCountries();
        });
        return unsubscribe;
    }, [navigation]); 

    useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerTitle: "Home",
            headerStyle: {
                backgroundColor: "purple",
            },
            headerSearchBarOptions: {
                placeholder: "Search",
                onChangeText: (event) => searchFilterFunction(event.nativeEvent.text),
            }
        });
    }, [navigation]); 


    const searchFilterFunction = (text) => {

        if (text) {
            const newData = countries.filter((item) => { 
                const itemData = item.name.common
                    ? item.name.common.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1; // If the text is found, return true
                
            });
            //Se busca por ciudades
            if (newData.length === 0) {
                countries.forEach((country) => {
                    if (country.capital) {
                        const itemData = country.capital[0].toUpperCase();
                        const textData = text.toUpperCase();
                        if (itemData.indexOf(textData) > -1) {
                            newData.push(country);
                        }
                    }
                });
            }
            setFilteredCountries(newData);
        } else {
            setFilteredCountries(countries);
        }
    }

    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            
            <Text style={styles.textCountry}>Countries</Text>
            {filteredCountries.map((country) => (
                <TouchableOpacity
                    key={country.cca3}
                    style={styles.itemContainer}
                    onPress={() => navigation.navigate("CountryScreen", { country })}
                >
                    <Image
                        source={{ uri: country.flags.png }}
                        style={styles.image}
                    />
                    <Text style={styles.textNameCountry}>{country.name.common}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: 20,
    },
    textCountry: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: "#f0f0f0",
        width: "90%",
        elevation: 2,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    textNameCountry: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
    },
});

