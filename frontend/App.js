import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider } from 'native-base'
import HomeScreen from "./src/screens/HomeScreen"; // Import your HomeScreen component
import SignUp from "./src/screens/SignUpScreen";
import LoginPage from "./src/screens/LoginPage";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Excuse" component={HomeScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          {/* Add more screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
