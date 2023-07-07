import React, { useState } from "react";
import { ImageBackground, StyleSheet, View, StatusBar } from "react-native";
import { NativeBaseProvider, Text, Button, Input, Box } from "native-base";
import axios from 'axios';

export default function App() {
  const [excuse, setExcuse] = useState('')

  const generateExcuse = async () => {
    try {
      console.log('click')
      const response = await axios.get(`https://excuse-s1se.onrender.com/excuse`)
      const data = response.data;
      console.log(response)

      setExcuse(data.excuse);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <NativeBaseProvider >
      <ImageBackground
        source={require('./assets/background.png')}
        style={styles.backgroundImage}
        >
          <StatusBar backgroundColor='black' barStyle="light-content"/>
          <View style={styles.excuseView}>
            <Text style={styles.excuseText}>{excuse}</Text>
          </View>
          <Box alignItems='center'>
            <Text flex='1' color='white'>Please describe the event you need to get out of:</Text>
            <Input flex='1' mx="auto" placeholder="Input" w="50%" accessibilityLabel="Excuse type input field"></Input>
          </Box>
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
    flex: 1,
    marginTop: '50%',
    marginLeft: '20%',
    marginRight: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  excuseText: {
    color: 'white',
  },
});

