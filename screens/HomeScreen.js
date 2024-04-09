import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
//import { Button } from "react-native-web";
import { useNavigation } from "@react-navigation/native";
//import { Header } from "react-native/Libraries/NewAppScreen";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);

    //Se obtienen los paises de la API de restcountries
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("https://restcountries.com/v3.1/all");  //Se usa la API de restcountries(Api diferente a la que pensaba usar) 
                const data = await response.json();
                setCountries(data);
                // Ordenar los países alfabéticamente por su nombre común
                const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
                setFilteredCountries(sortedCountries)

                console.log("Countries fetched:", data.slice(0, 10));

            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);


    //Se agrega un boton en la parte derecha del header para navegar a una seccion(Puede ser el perfil) y se agrega un buscador 
    useEffect(() => {
        navigation.setOptions({
            headerLargeTitle: true,
            headerTitle: "Home",
            headerStyle: {
                backgroundColor: "purple",
            },
            headerTintColor: "white",
            //Se agrega un boton en la parte derecha del header
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate("Stack")}
                    style={{
                        backgroundColor: "purple",
                        width: 30,
                        height: 30,
                        borderRadius: 10,
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            color: "white",
                            textAlign: "center",
                        }}
                    > + </Text>
                </TouchableOpacity>
            ),
            headerSearchBarOptions: {
                placeholder: "Search",
                onChangeText: (event) => {
                    searchFilterFunction(event.nativeEvent.text);
                }
            }
        });
    }, [navigation]);

    /*
    //Funcion para filtrar los paises por el nombre
    const searchFilterFunction = (text) => {
        if (text) { //Si el texto no esta vacio, se filtran los paises que coinciden con el texto ingresado 
            const newData = countries.filter((item) => {
                const itemData = item.name.common // 
                    ? item.name.common.toUpperCase()
                    : "".toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1; //Si el texto coincide con el nombre del pais se muestra en la lista y si no se retora un -1
            });
            setFilteredCountries(newData); //Aquí se guarda la lista de paises que coinciden con el texto ingresado
        } else {
            setFilteredCountries(countries.slice(0, 10));
        }
    }*/

    const searchFilterFunction = (text) => {
        if (text) { //Si el texto no esta vacio, se filtran los paises que coinciden con el texto ingresado 
            const newData = countries.filter((item) => {
                const itemData = item.name.common // 
                    ? item.name.common.toUpperCase()
                    : "".toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1; //Si el texto coincide con el nombre del pais se muestra en la lista y si no se retora un -1
            });
            setFilteredCountries(newData); //Aquí se guarda la lista de paises que coinciden con el texto ingresado
        } else {
            setFilteredCountries(countries);
        }
    }

    /*
        //Se muestran los paises con un encabezado por letra
        <ScrollView>
            {filteredCountries.map((group, index) => (
                <View key={index}>
                    <Text style={styles.sectionHeader}>{group.letter}</Text>
                    {group.countries.map((country, idx) => (
                        <View key={idx} style={styles.itemContainer}>
                            <Image
                                source={{ uri: country.flags.png }}
                                style={styles.image}
                            />
                            <Text style={styles.textNameCountry}>{country.name.common}</Text>
                        </View>
                    ))}
                </View>
            ))}
        </ScrollView>
    
    */
    
    return (<ScrollView>
        <Text style={styles.textCountry}>Countries</Text>
        {filteredCountries.map((country, index) => (
            <View key={index} style={styles.itemContainer}>
                <Image
                    source={{ uri: country.flags.png }}
                    style={styles.image}
                />
                <Text style={styles.textNameCountry}>{country.name.common}</Text>
            </View>
        ))}
    </ScrollView>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    textCountry: {
        fontSize: 20,
        textAlign: 'left',
        marginTop: 10,
        marginLeft: 10, //Se agrega margen izquierdo
        fontWeight: 'bold' //Se agrega negrita
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        borderColor: '#2a4944',
        borderWidth: 1,
    },
    image: {
        width: 50,
        height: 50,
        //se agrega un marco cuadrado a la imagen
        borderRadius: 10,
    },
    textNameCountry: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        marginLeft: 10,
    },

});