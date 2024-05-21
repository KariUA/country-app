import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Button,StyleSheet } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const navigation = useNavigation(); // Utilizar useNavigation
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1041966688626-dv6s05lj5ohl2q9mld7speg85t1vhe4j.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await getLocalUser();
    if (!user && response?.type === "success") {
      const userData = await getUserInfo(response.authentication.accessToken);
      if (userData) {
        navigation.navigate('HomeScreen'); // Redirigir al usuario a la pantalla principal
      }
    } else {
      setUserInfo(user);
      navigation.navigate('HomeScreen'); //Se redirige a la pantalla principal
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) {
      return null;
    }
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      navigation.navigate('HomeScreen'); //Se redirige a la pantalla principal
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      {userInfo ? (
        <View>
          <Text>Welcome {userInfo.name}</Text>
          <Button title="Sign out" onPress={handleSignOut} />
        </View>
      ) : (
        <View>
          <Button title="Sign in with Google" onPress={() => promptAsync()} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
