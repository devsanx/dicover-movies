import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Screens from "./src/screens";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const Stack = createStackNavigator();

const App = () => {
  const [fontLoaded] = useFonts({
    Regular: require("./assets/fonts/NunitoSans-Regular.ttf"),
    Bold: require("./assets/fonts/NunitoSans-Bold.ttf"),
    Black: require("./assets/fonts/NunitoSans-Black.ttf"),
    ExtraBold: require("./assets/fonts/NunitoSans-ExtraBold.ttf"),
    ExtraLight: require("./assets/fonts/NunitoSans-ExtraLight.ttf"),
    Light: require("./assets/fonts/NunitoSans-Light.ttf"),
    SemiBold: require("./assets/fonts/NunitoSans-SemiBold.ttf"),
  });

  return fontLoaded ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={Screens.HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="movie"
          component={Screens.MovieScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <AppLoading />
  );
};

export default App;
