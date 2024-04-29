import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";

const ONUScreen = ({ navigation }) => {
    const [UNMembers, setUNMembers] = useState([]);

    useEffect(() => {
        // Llamada a la API para obtener la lista de países miembros de la ONU
        const fetchUNMembers = async () => {
            try {
                const response = await fetch("https://restcountries.com/v3.1/all");
                const data = await response.json();
                const UNMembersList = data.filter((country) => country.unMember);
                const sortedUNMembers = UNMembersList.sort((a, b) => a.name.common.localeCompare(b.name.common));
                setUNMembers(sortedUNMembers);
            } catch (error) {
                console.error("Error fetching UN members:", error);
            }
        };

        fetchUNMembers();
    }, []);

    const handleCountryPress = (country) => {
        navigation.navigate("CountryScreen", { country: country });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCountryPress(item)}>
            <View style={styles.itemContainer}>
                <Image source={{ uri: item.flags.png }} style={styles.flag} />
                <Text style={styles.countryName}>{item.name.common}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Members of the United Nations</Text>
            <Text style={styles.textTitle}>Total: {UNMembers.length} countries</Text>
            <FlatList
                data={UNMembers}
                renderItem={renderItem}
                keyExtractor={(item) => item.cca3}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
};

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
    flatListContainer: {
        paddingBottom: 20,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    flag: {
        width: 30,
        height: 20,
        marginRight: 10,
    },
    countryName: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
    },
});

export default ONUScreen;
