import React, { useState } from "react";
import { ImageBackground, StyleSheet, View, StatusBar, Share} from "react-native";
import { NativeBaseProvider, Text, Button } from "native-base";
import axios from 'axios';

export default function App() {
  const [excuse, setExcuse] = useState('')
  const [excuseGenerated, setExcuseGenerated] = useState(false);

  const generateExcuse = async () => {
    try {
      console.log('click')
      const response = await axios.get(`https://excuse-s1se.onrender.com/excuse`)
      const data = response.data;
      console.log(response)

      setExcuse(data.excuse);
      setExcuseGenerated(true);
    } catch(error) {
      console.log(error);
      setExcuse('Excuse Generator is sick of your lies right now, try again shortly...')
    }
  }

  const shareExcuse = async () => {
    try {
      await Share.share({
        message: excuse
      })
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
          {excuseGenerated && (
          <View style={styles.container}>
            <Button onPress={shareExcuse}>
              Share
            </Button>
          </View>
        )}
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
