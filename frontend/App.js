import React, { useState } from "react";
import { ImageBackground, StyleSheet, View, StatusBar } from "react-native";
import { NativeBaseProvider, Text, Button } from "native-base";
import axios from 'axios';

export default function App() {
  const [excuse, setExcuse] = useState('')

  const generateExcuse = async () => {
    try {
      const response = await axios.get('http://localhost:3000/excuse')
      const data = response.data;
      console.log(response)

      setExcuse(data.excuse);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <NativeBaseProvider>
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.backgroundImage}
        >
          <StatusBar backgroundColor='black' barStyle="light-content"/>
          <View style={styles.container}>
              <Button testID="generate-excuse-button" onPress={generateExcuse}>Generate excuse</Button>
              <Text style={styles.excuse}>{excuse}</Text>
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
  },
  excuse: {
    
  }
});