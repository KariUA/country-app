import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

const SectionsScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sections</Text>
            <Image source={require("../assets/search.png")} style={{ width: 150, height: 150, resizeMode: "contain", alignSelf: "center" , marginBottom: 20}} />
            
            <View style={styles.sectionContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ContinentsScreen")}
                    style={[styles.sectionButton, { backgroundColor: "#FFA726" }]}
                >
                    <Text style={styles.sectionButtonText}>Continents</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.sectionContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("CapitalScreen")}
                    style={[styles.sectionButton, { backgroundColor: "#66BB6A" }]}
                >
                    <Text style={styles.sectionButtonText}>Capital Cities</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.sectionContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ONUScreen")}
                    style={[styles.sectionButton, { backgroundColor: "#5C6BC0" }]}
                >
                    <Text style={styles.sectionButtonText}>Countries members of the UN</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        marginTop: 50,
    },
    sectionContainer: {
        marginVertical: 10,
    },
    sectionButton: {
        padding: 20,
        width: "80%",
        borderRadius: 10,
        alignItems: "center",
    },
    sectionButtonText: {
        fontSize: 24,
        color: "#FFF",
        textAlign: "center",
    },
    header: {
        fontSize: 24,
        textAlign: "left",
        marginBottom: 40,
        fontWeight: "bold",
        color: "#000",
        padding: 20,
        alignItems: "flex-start",
    },

});

export default SectionsScreen;
