import { StatusBar } from 'expo-status-bar';
import React from "react";
// 1. import `NativeBaseProvider` component
import { ImageBackground, StyleSheet, View } from "react-native";
import { NativeBaseProvider, Text, Box, Button } from "native-base";

export default function App() {
  // 2. Use at the root of your app
  return (
    <NativeBaseProvider>
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.backgroundImage}
        >
          <View style={styles.container}>
            {/* <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
            </Box> */}
              <Button>Generate excuse</Button>
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