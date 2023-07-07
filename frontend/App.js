import React, { useState } from "react";
import { ImageBackground, StyleSheet, View, StatusBar } from "react-native";
import { NativeBaseProvider, Text, Button } from "native-base";
import axios from 'axios';
import { IP } from '@env';

export default function App() {
  const [excuse, setExcuse] = useState('')

  const generateExcuse = async () => {
    try {
      const response = await axios.get(`${IP}/excuse`)
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
          <View style={styles.excuseView}>
            <Text style={styles.excuseText}>{excuse}</Text>
          </View>
          <View style={styles.container}>
              <Button onPress={generateExcuse}>Generate Excuse</Button>
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
  excuseView: {
    marginTop: '50%',
    marginLeft: '20%',
    marginRight: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  excuseText: {
    color: 'white',
  }
});
