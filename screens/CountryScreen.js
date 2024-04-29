import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Linking } from "react-native";

const CountryScreen = ({ route }) => {
    const { country } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.textCountry}>{country.name.common}</Text>
            <View style={styles.flagContainer}>
                <Image source={{ uri: country.flags.png }} style={styles.flag}  />
            </View>

            <Text style={styles.sectionTitle}>Information:</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Capital:</Text>
                <Text style={styles.value}>{country.capital}</Text>
            </View>

            <View style={styles.infoContainer}>
            
                <Text style={styles.labelSpecial}>Phone prefixes:</Text>
                <Text style={styles.value}>{country.idd ? country.idd.root + country.idd.suffixes.join(', ') : 'N/A'}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Area:</Text>
                <Text style={styles.value}>{country.area} km²</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Population:</Text>
                <Text style={styles.value}>{country.population}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Region:</Text>
                <Text style={styles.value}>{country.region}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Subregion:</Text>
                <Text style={styles.value}>{country.subregion}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Timezones:</Text>
                <Text style={styles.value}>{country.timezones.join(", ")}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Languages:</Text>
                <Text style={styles.value}>{Object.values(country.languages).join(", ")}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Currencies:</Text>
                <Text style={styles.value}> {Object.keys(country.currencies).map(currency => `${currency} (${country.currencies[currency].name})`).join(', ')} </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Coat of Arms:</Text>
                <Image source={{ uri: country.coatOfArms.png }} style={styles.coatOfArms} />
            </View>
            <View style={styles.sectionTitle}>
                <Text style={styles.label}>Google Maps:</Text>
                <Text 
                    style={[styles.button, styles.buttonText]}
                    onPress={() => Linking.openURL(country.maps.googleMaps)}
                >
                    Open Google Maps
                </Text>
            </View>
            <View style={styles.sectionTitle}>
                <Text style={styles.label}>OpenStreetMaps:</Text>
                <Text 
                    style={[styles.button, styles.buttonText]}
                    onPress={() => Linking.openURL(country.maps.openStreetMaps)}
                >
                    Go to OpenStreetMaps
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        //alignItems: "center",
        //justifyContent: "center",
        paddingVertical: 20,
    },
    textCountry: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        paddingHorizontal: 20,


    },
    flagContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    infoContainer: {
        flexDirection: "row",
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
    },
    value: {
        fontSize: 16,
    },
    flag: {
        width: 150,
        height: 150,
        resizeMode: "contain",
        marginBottom: 20,
    },
    coatOfArms: {
        width: 150,
        height: 150,
        resizeMode: "contain", //Se agrega para que la imagen se ajuste al tamaño del contenedor sin deformarse
    },
    button: {
        backgroundColor: "#000",
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
    },
    additionalInfo: {
        fontSize: 12,
        color: "#666",
        lineHeight: 20,
        paddingHorizontal: 20,
    },
    labelSpecial: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
});

export default CountryScreen;
