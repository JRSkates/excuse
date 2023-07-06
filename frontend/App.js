import React from "react";
import { ImageBackground, StyleSheet, View, StatusBar } from "react-native";
import { NativeBaseProvider, Text, Button } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.backgroundImage}
        >
          <StatusBar backgroundColor='black' barStyle="light-content"/>
          <View style={styles.container}>
              <Button testID="generate-excuse-button">Generate excuse</Button>
          </View>
      </ImageBackground>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  }
});