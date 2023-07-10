import React, { useState } from "react";
import { ImageBackground, StyleSheet, View, StatusBar, Share} from "react-native";
import { NativeBaseProvider, Text, Button, Input, Box } from "native-base";
import axios from 'axios';

export default function App() {
  const [excuse, setExcuse] = useState('')
  const [excuseGenerated, setExcuseGenerated] = useState(false);
  const [typeInput, setTypeInput] = useState('')

  const generateExcuse = async () => {
    try {
      console.log('click')
      const response = await axios.get(`http://10.64.7.82:3000/excuse`, { 
        params:{
          eventType: typeInput
        }
      })
      setTypeInput('');
      const data = response.data;
      // console.log(response)

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

    const handleTextInputChange = (typeInput) => {
    setTypeInput(typeInput);
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
          {excuseGenerated && (
          <View style={styles.container}>
            <Button onPress={shareExcuse}>
              Share
            </Button>
          </View>
        )}
          <Box style={styles.inputBox}>
            <Text color='white'>Have a specific event you need to get out of? Describe it below!</Text>
            <Input color='white' placeholder="Type here..." accessibilityLabel="Excuse type input field"
            onChangeText={handleTextInputChange}
            defaultValue={typeInput}
            />
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
  inputBox: {
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

//TODO: fix styling so elements don't overlap when keyboard is open, and have more space in between them