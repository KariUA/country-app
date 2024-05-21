import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Importar useNavigation y useFocusEffect

const SettingScreen = () => {
  const navigation = useNavigation(); // Utilizar useNavigation para navegación
  const [user, setUser] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      fetchUser();
    }, [])
  );

  const fetchUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("@user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      setUser(null);
      // Redirigir al usuario a la pantalla de inicio de sesión
      navigation.navigate('LoginScreen'); // Aquí se realiza la redirección
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Perfil de Usuario</Text>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        {user ? (
          <>
            <Image source={{ uri: user.picture }} style={styles.profileImage} />
            <Text style={styles.text}>Nombre: {user.name}</Text>
            <Text style={styles.text}>Correo electrónico: {user.email}</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </>
        ) : (
          //Redirigir a LoginScreen
          navigation.navigate('LoginScreen'),
          <Text style={styles.text}>Cargando usuario...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "purple",
    paddingVertical: 20,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default SettingScreen;
